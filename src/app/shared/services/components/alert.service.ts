import { effect, Injectable, signal } from '@angular/core';
import { AlertStatus } from '@components/alert/alert.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
    alertMessage = signal<string>("");
    alertStatus = signal<AlertStatus>("info");

    show = signal<boolean>(false);
    private _showEffect = effect(() => {
        const show = this.show();
        if (show) {
            setTimeout(() => {
                this.show.set(false);
            }, 2000)
        }
    },
        {
            allowSignalWrites: true,
        });

    error(message: string): void {
        this.alertMessage.set(message);
        this.alertStatus.set("error");
        this.show.set(true);
    }
}