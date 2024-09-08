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

    message = input.required<string>();
    status = input<AlertStatus>("info");
}