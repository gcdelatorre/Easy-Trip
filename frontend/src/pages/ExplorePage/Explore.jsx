import { Link } from "react-router-dom";
export default function Explore() {

    return (
        <div>
            {/* we will put blogs about countries here soon, lets put coming soon */}
            <Link to="/" className="absolute top-4 left-4">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Back</button>
            </Link>
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Coming Soon</h1>
            </div>
        </div>
    );
}