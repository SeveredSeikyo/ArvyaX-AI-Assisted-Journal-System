"use client"

import { useEffect, useState } from "react";

export function useUserId() {

    const [userId, setUserId] = useState<string | any>(null);

    useEffect(() => {

        let id = localStorage.getItem("journal_user_id");

        if(!id) {
            id = crypto.randomUUID();
            localStorage.setItem("journal_user_id", id);
        }

        setUserId(id);
    }, []);

    return userId;
}