import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

export function DashboardNavbar() {
    const location = useLocation();
    const pathname = location.pathname;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, logout } = useAuth();

    const isActive = (path) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                <div className="flex items-center gap-10">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <img
                            src="/easytrip-logo-transparent.png"
                            alt="Easytrip"
                            className="h-10 w-auto"
                        />
                    </Link>

                    <div className="hidden items-center gap-5 md:flex">
                        <Link
                            to="/dashboard"
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive("/dashboard")
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                }`}
                        >
                            My Trips
                        </Link>
                        <Link
                            to="/explore"
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive("/explore")
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                }`}
                        >
                            Explore
                        </Link>
                        <Link
                            to="/create"
                            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                        >
                            Create a Plan
                        </Link>
                    </div>
                </div>

                <div className="hidden items-center md:flex">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                        >
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground overflow-hidden">
                                {user?.picture ? (
                                    <img src={user.picture} alt={user.name} className="h-full w-full object-cover" />
                                ) : (
                                    <User size={14} />
                                )}
                            </div>
                            <span className="max-w-[120px] truncate font-medium">{user?.name || "User"}</span>
                            <ChevronDown size={14} className="text-muted-foreground" />
                        </button>

                        {profileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setProfileOpen(false)}
                                />
                                <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                                    <div className="px-3 py-2 text-xs text-muted-foreground ">
                                        Signed in as <br /> <span className="font-medium text-foreground">{user?.email}</span>
                                    </div>
                                    <div className="my-1 h-px bg-border" />
                                    <button
                                        onClick={() => {
                                            logout();
                                            setProfileOpen(false);
                                        }}
                                        className="w-full text-left flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
                                    >
                                        <LogOut size={15} />
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {mobileOpen && (
                <div className="border-t border-border bg-card px-6 pb-5 md:hidden">
                    <div className="flex flex-col gap-2 pt-4">
                        <Link
                            to="/explore"
                            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive("/explore")
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                }`}
                            onClick={() => setMobileOpen(false)}
                        >
                            Explore
                        </Link>
                        <Link
                            to="/dashboard"
                            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive("/dashboard")
                                ? "bg-secondary text-foreground"
                                : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                }`}
                            onClick={() => setMobileOpen(false)}
                        >
                            My Trips
                        </Link>
                        <Link
                            to="/create"
                            className="rounded-full bg-accent px-5 py-2.5 text-center text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                            onClick={() => setMobileOpen(false)}
                        >
                            Create a Plan
                        </Link>
                        <div className="mt-2 h-px bg-border" />
                        <div className="flex items-center gap-3 px-4 py-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground overflow-hidden">
                                {user?.picture ? (
                                    <img src={user.picture} alt={user.name} className="h-full w-full object-cover" />
                                ) : (
                                    <User size={15} />
                                )}
                            </div>
                            <span className="text-sm font-medium text-foreground">{user?.name || "User"}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
                        >
                            <LogOut size={15} />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
