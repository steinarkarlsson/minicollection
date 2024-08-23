'use client'
import { useRouter } from 'next/navigation';

export function ClearFilters() {
    const router = useRouter();

    const handleClearFilters = () => {
        router.push(`/`);
    };

    return (
        <input
            type="button"
            value="Clear Filters"
            onClick={handleClearFilters}
        />
    );
}