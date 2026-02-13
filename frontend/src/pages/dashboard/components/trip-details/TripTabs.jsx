export function TripTabs({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'itinerary', label: 'Itinerary' },
        { id: 'info', label: 'General Information' },
    ];

    return (
        <div className="flex gap-1 border-b border-border">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-3 text-sm font-medium transition-all relative ${activeTab === tab.id
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                    )}
                </button>
            ))}
        </div>
    );
}
