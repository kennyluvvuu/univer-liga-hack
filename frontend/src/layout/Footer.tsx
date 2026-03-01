import { memo } from "react";

export default memo(function Footer() {
    return (
        <footer className="shrink-0 mt-auto border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-center px-4">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Feedback System Inc. Все права защищены.
                </p>
            </div>
        </footer>
    );
});