import { Component, ViewChild, ChangeDetectorRef, NgZone, inject, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateSection } from './modals/create-section/create-section';
import esLocale from '@fullcalendar/core/locales/es';
import { Category, Session, Status } from '../../core/models';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SessionService } from '../../core/services/calendar/session.service';
import { CategoryService } from '../../core/services/calendar/category.service';
import { StatusService } from '../../core/services/calendar/status.service';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [FullCalendarModule, ButtonModule, SelectModule, CommonModule, FormsModule, ReactiveFormsModule, FloatLabelModule],
    templateUrl: './calendar.html',
    styleUrl: './calendar.css',
    providers: [DialogService]
})
export class Calendar implements OnInit {

    private sessionService = inject(SessionService);
    private categoryService = inject(CategoryService);
    private statusService = inject(StatusService);

    categories: Category[] = [];

    statusOptions: Status[] = [];

    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

    categoryControllerFilter: FormControl<number | null> = new FormControl<number | null>(null, []);
    statusControllerFilter: FormControl<number | null> = new FormControl<number | null>(null, []);

    allEvents: Session[] = [];
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
        eventContent: (arg) => {
            const status = arg.event.extendedProps['status'];
            const title = arg.event.title;
            const startTime = arg.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

            if (status === 2) { // Bloqueado
                return {
                    html: `
                        <div class="flex items-center justify-between w-full p-1 rounded-sm border-l-4 border-red-700 bg-red-100 text-red-900 group">
                            <div class="flex flex-col overflow-hidden">
                                <span class="text-[10px] font-bold opacity-75">${startTime}</span>
                                <span class="text-xs font-medium truncate">${title}</span>
                            </div>
                            <i class="pi pi-ban text-xs text-red-700 mr-1"></i>
                        </div>
                    `
                };
            }

            if (status === 3) { // Oculto
                return {
                    html: `
                        <div class="flex items-center justify-between w-full p-1 rounded-sm border-l-4 border-[#303030] bg-[#999999] text-white group">
                            <div class="flex flex-col overflow-hidden">
                                <span class="text-[10px] font-bold opacity-75">${startTime}</span>
                                <span class="text-xs font-medium truncate">${title}</span>
                            </div>
                            <i class="pi pi-eye-slash text-xs text-[#303030] mr-1"></i>
                        </div>
                    `
                };
            }

            // Default rendering for other statuses
            return {
                html: `
                    <div class="flex flex-col p-1 w-full overflow-hidden bg-pink-50/50 border-l-4 border-[#E0345E] rounded-sm">
                        <span class="text-[10px] font-bold text-[#E0345E]">${startTime}</span>
                        <span class="text-xs font-medium truncate text-slate-800">${title}</span>
                    </div>
                `
            };
        },
        dayCellContent: (arg) => {
            const dayNumber = arg.dayNumberText;
            const month = arg.date.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
            const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
            return { html: `<div class="flex items-center gap-1"><span>${dayNumber}</span><span class="text-[10px] opacity-60 font-normal">${capitalizedMonth}</span></div>` };
        },
        events: []
    };

    private cdr = inject(ChangeDetectorRef);
    private ngZone = inject(NgZone);
    private dialogService = inject(DialogService);


    ngOnInit() {
        // Suscribirse a los cambios de los filtros
        this.categoryControllerFilter.valueChanges.subscribe(() => this.applyFilters());
        this.statusControllerFilter.valueChanges.subscribe(() => this.applyFilters());

        this.loadData();
    }

    loadData() {
        this.sessionService.getSessions().subscribe((sessions) => {
            this.allEvents = sessions;
            this.applyFilters();
        });

        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });

        this.statusService.getStatuses().subscribe((statuses) => {
            this.statusOptions = statuses;
        });
    }

    applyFilters() {
        this.ngZone.run(() => {
            setTimeout(() => {
                const categoryId = this.categoryControllerFilter.value;
                const statusId = this.statusControllerFilter.value;

                let filtered = [...this.allEvents];

                if (categoryId) {
                    filtered = filtered.filter(e => e.category === categoryId);
                }

                if (statusId) {
                    filtered = filtered.filter(e => e.status === statusId);
                }

                this.calendarOptions = {
                    ...this.calendarOptions,
                    events: [...filtered] as any[] // Asegurar compatibilidad final
                };
                this.cdr.detectChanges();
                this.cdr.markForCheck();
            });
        });
    }

    handleDatesSet(arg: any) {
        this.currentMonthTitle = arg.view.title;
        this.cdr.detectChanges();
    }

    handleEventClick(arg: any) {
        const eventId = arg.event.id;
        const session = this.allEvents.find(s => s.id === eventId);
        if (session) {
            this.openModal(session);
        }
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

    openModal(sessionToEdit?: Session) {
        const ref: any = this.dialogService.open(CreateSection, {
            header: sessionToEdit ? 'Editar Sesión' : 'Crear Sesión',
            width: '50vw',
            data: {
                session: sessionToEdit,
                categories: this.categories,
                statusOptions: this.statusOptions
            },
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        });

        ref.onClose.subscribe((session: any) => {
            if (!session) return;

            this.ngZone.run(() => {
                if (session.action === 'delete') {
                    this.sessionService.deleteSession(sessionToEdit!.id).subscribe(() => {
                        this.loadData();
                    });
                    return;
                }

                const startDate = new Date(session.date);
                startDate.setHours(session.start.getHours(), session.start.getMinutes());

                const endDate = new Date(session.date);
                endDate.setHours(session.end.getHours(), session.end.getMinutes());

                const sessionData: Session = {
                    id: sessionToEdit?.id || String(Date.now()),
                    title: session.title,
                    date: session.date,
                    start: startDate,
                    end: endDate,
                    description: session.description,
                    city: session.city,
                    status: session.status,
                    category: session.category,
                    image: session.image
                };

                if (sessionToEdit) {
                    this.sessionService.updateSession(sessionToEdit.id, sessionData).subscribe(() => {
                        this.loadData();
                    });
                } else {
                    this.sessionService.createSession(sessionData).subscribe(() => {
                        this.loadData();
                    });
                }
            });
        });
    }
}
