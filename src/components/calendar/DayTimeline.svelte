<script lang="ts">
    import type { CalendarEventType } from '$lib/types';
    import { onMount } from 'svelte';
    
    let { 
        date = new Date(),
        events = [] as CalendarEventType[]
    } = $props();
    
    // Generate time slots for 24 hours
    const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6); // 6am to 11pm
    
    // Days of the week
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    
    // Get the Monday of the current week
    function getMonday(d: Date) {
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
        return new Date(d.setDate(diff));
    }
    
    // Generate dates for the week
    let weekDates: Date[] = [];
    $effect(() => {
        const monday = getMonday(new Date(date));
        weekDates = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            return day;
        });
    });
    
    // Format date for display (e.g., "15")
    function formatDateNumber(date: Date) {
        return date.getDate().toString();
    }
    
    // Filter events for the week
    $effect(() => {
        if (weekDates.length && events.length) {
            const startOfWeek = new Date(weekDates[0]);
            startOfWeek.setHours(0, 0, 0, 0);
            
            const endOfWeek = new Date(weekDates[6]);
            endOfWeek.setHours(23, 59, 59, 999);
            
            weeklyEvents = events.filter(event => {
                const eventDate = new Date(event.start);
                return eventDate >= startOfWeek && eventDate <= endOfWeek;
            });
        } else {
            weeklyEvents = [];
        }
    });
    
    let weeklyEvents: CalendarEventType[] = [];
    let timelineContainer: HTMLElement;
    
    // Scroll to 8am on mount
    onMount(() => {
        if (timelineContainer) {
            // 6am is at the top, so 8am is 2 hours down (2 * 60px)
            timelineContainer.scrollTop = 120;
        }
    });
    
    // Determine background color based on event type
    function getEventColor(type: string | undefined) {
        if (!type) return 'bg-gray-400';
        
        type EventColorMap = {
            [key: string]: string;
        };
        
        const colors: EventColorMap = {
            'work': 'bg-blue-400',
            'meeting': 'bg-purple-400',
            'lunch': 'bg-yellow-400',
            'personal': 'bg-green-400',
            'uec': 'bg-orange-500',
            'ai': 'bg-blue-500',
            'goal': 'bg-red-500',
            'meditation': 'bg-blue-400',
            'parkrun': 'bg-green-500',
            'founders': 'bg-blue-500',
            'catch': 'bg-blue-400',
            'default': 'bg-gray-400'
        };
        
        return colors[type.toLowerCase()] || colors.default;
    }
    
    // Calculate position and size for an event
    function getEventStyle(event: CalendarEventType, dayIndex: number) {
        const eventDate = new Date(event.start);
        const eventDay = eventDate.getDay() - 1; // Convert to 0-6 (Mon-Sun)
        const adjustedDay = eventDay < 0 ? 6 : eventDay; // Handle Sunday
        
        // Only position if the event belongs to this day
        if (adjustedDay !== dayIndex) return { display: 'none' };
        
        const startHour = eventDate.getHours();
        const startMinute = eventDate.getMinutes();
        const endDate = new Date(event.end);
        const endHour = endDate.getHours();
        const endMinute = endDate.getMinutes();
        
        // Calculate top position (50px per hour) relative to 6am
        const startPosition = ((startHour - 6) + startMinute / 60) * 50;
        const endPosition = ((endHour - 6) + endMinute / 60) * 50;
        const height = endPosition - startPosition;
        
        return {
            top: `${startPosition}px`,
            height: `${Math.max(height, 18)}px` // Minimum height of 18px
        };
    }
    
    // Format time (e.g., "2:30pm")
    function formatTime(date: Date) {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        }).toLowerCase();
    }
    
    // Format time range (e.g., "8 – 10am")
    function formatTimeRange(start: Date, end: Date) {
        const startHour = start.getHours();
        const startMin = start.getMinutes();
        const endHour = end.getHours();
        const endMin = end.getMinutes();
        
        const startFormat = startHour === 0 ? '12' : 
                           startHour > 12 ? (startHour - 12).toString() : 
                           startHour.toString();
                           
        const endFormat = endHour === 0 ? '12' : 
                         endHour > 12 ? (endHour - 12).toString() : 
                         endHour.toString();
                         
        const amPm = endHour >= 12 ? 'pm' : 'am';
        
        // Only show minutes if they're not zero
        const startMinStr = startMin > 0 ? `:${startMin.toString().padStart(2, '0')}` : '';
        const endMinStr = endMin > 0 ? `:${endMin.toString().padStart(2, '0')}` : '';
        
        return `${startFormat}${startMinStr} – ${endFormat}${endMinStr}${amPm}`;
    }
    
    // Get timezone string
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneAbbr = timezone.includes('/') ? 
        timezone.split('/')[1].substring(0, 3).toUpperCase() : 
        timezone.substring(0, 3).toUpperCase();
    
    // Sample events if none provided
    $effect(() => {
        if (!events || events.length === 0) {
            const today = new Date();
            const monday = getMonday(today);
            
            events = [
                {
                    id: 1,
                    title: 'Work',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 2, 11, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 2, 13, 0),
                    type: 'work'
                },
                {
                    id: 2,
                    title: 'Lunch with Fanni',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 13, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 14, 0),
                    type: 'lunch'
                },
                {
                    id: 3,
                    title: '5K Parkrun',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 5, 8, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 5, 10, 0),
                    type: 'parkrun'
                },
                {
                    id: 4,
                    title: 'Meditation & Buddhism',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6, 13, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6, 14, 0),
                    type: 'meditation'
                },
                {
                    id: 5,
                    title: 'Daily Catch up calls',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 17, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 17, 30),
                    type: 'catch'
                },
                {
                    id: 6,
                    title: 'Daily Catch up calls',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 17, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 17, 30),
                    type: 'catch'
                },
                {
                    id: 7,
                    title: 'Daily Catch up calls',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 2, 17, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 2, 17, 30),
                    type: 'catch'
                },
                {
                    id: 8,
                    title: 'Daily Catch up calls',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3, 17, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3, 17, 30),
                    type: 'catch'
                },
                {
                    id: 9,
                    title: 'Daily Catch up calls',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4, 17, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4, 17, 30),
                    type: 'catch'
                },
                {
                    id: 10,
                    title: 'Veevo - Fynn <> Muke',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 18, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 19, 0),
                    type: 'uec',
                    location: ''
                },
                {
                    id: 11,
                    title: 'The Exit Meetup | Berlin Feb 2025',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 18, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 20, 0),
                    type: 'ai',
                    location: 'Hallesches Haus Store'
                },
                {
                    id: 12,
                    title: 'YC Founders Berlin: Pacing to PMF and Beyond',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4, 19, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4, 21, 0),
                    type: 'founders',
                    location: 'CODE University of Applied Sciences'
                },
                {
                    id: 13,
                    title: 'AI Computer Use Hacker Day',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4, 10, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 4, 18, 0),
                    type: 'ai',
                    location: 'CODE University of Applied Sciences, Donaußtraße 44, 12043 Berlin, Germany'
                },
                {
                    id: 14,
                    title: 'Goal + Calendar Idea Workshop',
                    start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 5, 11, 0),
                    end: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 5, 12, 0),
                    type: 'goal'
                }
            ];
        }
    });
</script>

<div class="bg-white border rounded-lg shadow overflow-hidden">
    <!-- Header with days of week and dates -->
    <div class="grid grid-cols-8 border-b text-center">
        <!-- Timezone cell -->
        <div class="py-1 px-1 border-r text-xs text-gray-500 font-medium">
            {timezoneAbbr}+01
        </div>
        
        <!-- Days of week -->
        {#each daysOfWeek as day, i}
            <div class="py-1 border-r last:border-r-0">
                <div class="text-xs text-gray-500 font-medium">{day}</div>
                <div class="text-lg font-semibold">{weekDates[i] ? formatDateNumber(weekDates[i]) : ''}</div>
            </div>
        {/each}
    </div>
    
    <!-- Timeline container with scrolling -->
    <div bind:this={timelineContainer} class="relative overflow-y-auto" style="height: 450px;">
        <div class="grid grid-cols-8" style="height: 900px;"> <!-- 18 hours * 50px -->
            <!-- Time slots column -->
            <div class="relative border-r">
                {#each timeSlots as hour}
                    <div class="absolute w-full h-[1px] bg-gray-200" style="top: {(hour - 6) * 50}px;">
                        <div class="relative -top-3 text-xs text-gray-500 pl-2">
                            {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                        </div>
                    </div>
                {/each}
            </div>
            
            <!-- Day columns -->
            {#each Array(7) as _, dayIndex}
                <div class="relative border-r last:border-r-0">
                    <!-- Horizontal grid lines -->
                    {#each timeSlots as hour}
                        <div class="absolute w-full h-[1px] bg-gray-200" style="top: {(hour - 6) * 50}px;"></div>
                    {/each}
                    
                    <!-- Events for this day -->
                    {#each weeklyEvents as event}
                        {@const style = getEventStyle(event, dayIndex)}
                        {#if style.display !== 'none'}
                            <div 
                                class="absolute left-[1px] right-[1px] rounded-md px-1 py-0.5 text-xs overflow-hidden {getEventColor(event.type)}"
                                style="top: {style.top}; height: {style.height};"
                            >
                                <div class="font-semibold text-xs leading-tight truncate">{event.title}</div>
                                <div class="text-xs truncate">
                                    {formatTimeRange(new Date(event.start), new Date(event.end))}
                                </div>
                                {#if event.location && style.height && parseInt(style.height) > 30}
                                    <div class="truncate text-xs mt-0.5">{event.location}</div>
                                {/if}
                            </div>
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div> 