export const sessionByState = (state: number, startTime: string | undefined, title: string) => {
    switch (state) {
        case 2:
            return `
                        <div class="flex items-center justify-between w-full p-1 rounded-sm border-l-4 border-red-700 bg-red-100 text-red-900 group">
                            <div class="flex flex-col overflow-hidden">
                                <span class="text-[10px] font-bold opacity-75">${startTime}</span>
                                <span class="text-xs font-medium truncate">${title}</span>
                            </div>
                            <i class="pi pi-ban text-xs text-red-700 mr-1"></i>
                        </div>
                    `;
        case 3:
            return `
                        <div class="flex items-center justify-between w-full p-1 rounded-sm border-l-4 border-[#303030] bg-[#999999] text-white group">
                            <div class="flex flex-col overflow-hidden">
                                <span class="text-[10px] font-bold opacity-75">${startTime}</span>
                                <span class="text-xs font-medium truncate">${title}</span>
                            </div>
                            <i class="pi pi-eye-slash text-xs text-[#303030] mr-1"></i>
                        </div>
                    `;
        default:
            return `
                    <div class="flex flex-col p-1 w-full overflow-hidden bg-pink-50/50 border-l-4 border-[#E0345E] rounded-sm">
                        <span class="text-[10px] font-bold text-[#E0345E]">${startTime}</span>
                        <span class="text-xs font-medium truncate text-slate-800">${title}</span>
                    </div>
                `;
    }
}