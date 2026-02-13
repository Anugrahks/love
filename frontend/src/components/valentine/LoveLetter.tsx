import GlassCard from './GlassCard';

export default function LoveLetter() {
    return (
        <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto text-center fade-in">
            <GlassCard className="p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50" />

                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient-romantic font-serif">
                    My dear Kukku,
                </h2>

                <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-serif text-left md:text-center">
                    <p>
                        I’ve been thinking a lot about us… and about the way I’ve hurt you.
                        I want to say this clearly and sincerely — <span className="font-semibold text-primary">I am truly sorry.</span>
                    </p>

                    <p>
                        I’m sorry for the fights, for raising my voice, for making you cry, and for ruining your mood — even when you were just trying to enjoy your time with your friends. Especially after our last fight… I feel really bad about it. You didn’t deserve that from someone who loves you.
                    </p>

                    <p>
                        Sometimes my anger speaks faster than my heart, and I end up saying things I never actually mean. But that is not an excuse. I regret every word that hurt you. I hate knowing I was the reason for your tears.
                    </p>

                    <p>
                        I promise I’m going to change — not just by saying it, but by showing it. I don’t want to fight you anymore. I want to understand you, protect your happiness, and be the reason you smile… not cry.
                    </p>

                    <p>
                        Please forgive me if you can. <br />
                        I really love you with all my heart, and I miss you so much, Kukku.
                    </p>
                </div>

                <div className="mt-12 text-2xl md:text-3xl font-handwriting text-gradient-gold">
                    Always yours ❤️
                </div>
            </GlassCard>
        </section>
    );
}
