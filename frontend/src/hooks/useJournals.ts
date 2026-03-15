"use client"

import { useEffect, useState } from "react";
import { Journal } from "../types/journal";
import { fetchJournals } from "../services/api";

export function useJournals(userId: string) {
    const [journals, setJournals] = useState<Journal[] | any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadJournals() {
            try {
                const data = await fetchJournals({userId});
                setJournals(data);
            } catch(err) {
                setError("Failed to fetch Journals");
            } finally {
                setLoading(false);
            }
        }

        if(userId) {
            loadJournals();
        }
    }, [userId]);

    return {journals, error, loading}
}