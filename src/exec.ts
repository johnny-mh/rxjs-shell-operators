import {exec as nodeExec, ExecOptions} from 'child_process';
import {Observable, Subscriber} from 'rxjs';
import {killProc} from './util';

export function exec(command: string, options?: ExecOptions) {
  return new Observable((subscriber: Subscriber<string>) => {
    const proc = nodeExec(command, options, (err, stdout, stderr) => {
      if (err) {
        subscriber.error(err);
        return;
      }

      subscriber.next(`${stdout}${stderr}`);
      subscriber.complete();
    });

    return () => killProc(proc);
  });
}