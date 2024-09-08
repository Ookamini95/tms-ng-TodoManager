import { Component, inject, input } from '@angular/core';
import { AlertService } from '@shared/services/components/alert.service';

export type AlertStatus = "warning" | "success" | "error" | "info";
@Component({
    selector: 'app-alert',
    standalone: true,
    templateUrl: 'alert.component.html'
})
export class AlertComponent {
    protected alert = inject(AlertService);

    status = input<AlertStatus>("info");
    message = input.required<string>();
}