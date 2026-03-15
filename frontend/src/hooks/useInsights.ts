"use client"

import { useEffect, useState } from "react";
import { Insights } from "../types/journal";
import { fetchInsights } from "../services/api";

export function useInsights(userId: string) {

	const [insights, setInsights] = useState<Insights | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadInsights() {
			try {
				const data = await fetchInsights({userId});
				setInsights(data);
			} catch(err) {
				setError("Failed to load insights");
			} finally {
				setLoading(false);
			}
		}

		if(userId) {
			loadInsights();
		}
	}, [userId]);

	return { insights, loading, error };
}
