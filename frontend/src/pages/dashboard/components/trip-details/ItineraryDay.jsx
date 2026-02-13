import { Clock } from 'lucide-react';

export function ItineraryDay({ day }) {
    return (
        <div className="rounded-xl border border-border bg-card p-8 transition-all hover:border-accent/20 hover:shadow-sm">
            <div className="mb-6">
                <span className="text-sm font-medium text-accent">Day {day.day}</span>
                <h3 className="font-serif text-xl text-foreground mt-2">{day.title || `Day ${day.day} Exploration`}</h3>
            </div>

            <div className="space-y-5">
                {day.activities?.map((activity, idx) => (
                    <div key={idx} className="flex gap-5">
                        {/* Timeline */}
                        <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-accent/40" />
                            {idx < day.activities.length - 1 && (
                                <div className="mt-2 h-12 w-0.5 bg-border/50" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-0.5">
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-muted-foreground" />
                                <span className="text-xs font-medium text-muted-foreground">{activity.time || 'Flexible Time'}</span>
                            </div>
                            <h4 className="font-medium text-foreground mt-1.5">{activity.name}</h4>
                            <p className="text-sm text-muted-foreground mt-0.5">{activity.shortDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
