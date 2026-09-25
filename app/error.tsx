"use client";
export default function Error({ reset }: {
    reset: () => void;
}) { return <section className="not-found"><h1>Un instant.</h1><p>Cette page rencontre un problème temporaire.</p><button className="button purple" onClick={reset}>Réessayer</button></section>; }
