import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateSection } from './modals/create-section/create-section';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [FullCalendarModule, ButtonModule],
    templateUrl: './calendar.html',
    styleUrl: './calendar.css',
    providers: [DialogService]
})
export class Calendar {
    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
    
    currentMonthTitle: string = '';

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        locale: esLocale,
        headerToolbar: false,
        eventDisplay: 'block',
        dateClick: (arg) => this.handleDateClick(arg),
        datesSet: (arg) => this.handleDatesSet(arg),
        events: [
            { title: 'event 1', date: '2026-02-02' },
            { title: 'event 2', date: '2026-02-03' }
        ]
    };

    constructor(
        private dialogService: DialogService,
        private cdr: ChangeDetectorRef
    ) {}

    handleDatesSet(arg: any) {
        this.currentMonthTitle = arg.view.title;
        this.cdr.detectChanges();
    }

    prev() {
        this.calendarComponent.getApi().prev();
    }

    next() {
        this.calendarComponent.getApi().next();
    }


    handleDateClick(arg: any) {
        alert('date click! ' + arg.dateStr)
    }

    openModal() {
        const ref:any = this.dialogService.open(CreateSection, {
            header: 'Crear Sección',
            width: '50vw',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        ref.onClose.subscribe((session: any) => {
            if (session) {
                // Combinar fecha y horas en objetos Date adecuados para FullCalendar
                const startDate = new Date(session.date);
                startDate.setHours(session.startTime.getHours(), session.startTime.getMinutes());

                const endDate = new Date(session.date);
                endDate.setHours(session.endTime.getHours(), session.endTime.getMinutes());

                const newEvent = {
                    title: session.title,
                    start: startDate,
                    end: endDate,
                    extendedProps: {
                        description: session.description,
                        city: session.city,
                        status: session.status
                    }
                };

                // Actualizar eventos usando propagación para disparar la detección de cambios en FullCalendar
                this.calendarOptions = {
                    ...this.calendarOptions,
                    events: [...(this.calendarOptions.events as any[]), newEvent]
                };
            }
        });
    }
}
