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
        firstDay: 1, // Lunes como primer día
        headerToolbar: false,
        eventDisplay: 'block',
        dateClick: (arg) => this.handleDateClick(arg),
        datesSet: (arg) => this.handleDatesSet(arg),
        eventClick: (arg) => this.handleEventClick(arg),
        dayCellContent: (arg) => {
            const dayNumber = arg.dayNumberText;
            const month = arg.date.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
            const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
            return { html: `<div class="flex items-center gap-1"><span>${dayNumber}</span><span class="text-[10px] opacity-60 font-normal">${capitalizedMonth}</span></div>` };
        },
        events: []
    };

    constructor(
        private dialogService: DialogService,
        private cdr: ChangeDetectorRef
    ) {}

    handleDatesSet(arg: any) {
        this.currentMonthTitle = arg.view.title;
        this.cdr.detectChanges();
    }

    handleEventClick(arg: any) {
        const event = arg.event;
        const sessionData = {
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            ...event.extendedProps
        };
        this.openModal(sessionData);
    }

    prev() {
        this.calendarComponent.getApi().prev();
    }

    next() {
        this.calendarComponent.getApi().next();
    }


    handleDateClick(arg: any) {
        // En el futuro podríamos abrir el modal directamente aquí con la fecha seleccionada
        console.log('date click! ' + arg.dateStr)
    }

    openModal(sessionToEdit?: any) {
        const ref:any = this.dialogService.open(CreateSection, {
            header: sessionToEdit ? 'Editar Sesión' : 'Crear Sesión',
            width: '50vw',
            data: {
                session: sessionToEdit
            },
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

                const eventData = {
                    id: sessionToEdit?.id || String(Date.now()),
                    title: session.title,
                    start: startDate,
                    end: endDate,
                    extendedProps: {
                        description: session.description,
                        city: session.city,
                        status: session.status,
                        category: session.category,
                        image: session.image
                    }
                };

                const currentEvents = [...(this.calendarOptions.events as any[])];
                
                if (sessionToEdit) {
                    // Actualizar evento existente
                    const index = currentEvents.findIndex(e => e.id === sessionToEdit.id);
                    if (index !== -1) {
                        currentEvents[index] = eventData;
                    }
                } else {
                    // Añadir nuevo evento
                    currentEvents.push(eventData);
                }

                this.calendarOptions = {
                    ...this.calendarOptions,
                    events: currentEvents
                };
                this.cdr.detectChanges();
            }
        });
    }
}
