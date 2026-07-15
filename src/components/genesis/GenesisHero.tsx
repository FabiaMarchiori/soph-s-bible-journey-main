import { Play, Heart, Share2, Sparkles, BookOpen, Compass, Clock } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { BdsButton } from "@/components/bds";
import { cn } from "@/lib/utils";

interface GenesisHeroProps {
  coverImage: string;
  universeImage: string;
  isFavorited: boolean;
  onFavorite: () => void;
  onShare: () => void;
}

export function GenesisHero({
  coverImage,
  universeImage,
  isFavorited,
  onFavorite,
  onShare,
}: GenesisHeroProps) {
  const navigate = useNavigate();
    <section className="relative mx-auto mt-6 max-w-[1400px] px-4 md:px-8" aria-label="Apresentação do Livro">
      <div className="relative overflow-hidden rounded-[32px] border border-app-border bg-app-surface-elevated/40 p-6 md:p-12 backdrop-blur-xl">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-hero opacity-40" />
          <img
            src={universeImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-overlay"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
          {/* Book Cover with 3D Spine Effect */}
          <div className="relative mx-auto w-[220px] shrink-0 md:w-[280px] [perspective:1000px]">
            <div
              className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 shadow-elevated transition-all duration-300 ease-smooth hover:scale-[1.03] hover:[transform:rotateY(-10deg)_rotateX(4deg)] [transform-style:preserve-3d]"
              style={{
                boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
              }}
            >
              {/* Book spine effect on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-[14px] bg-gradient-to-r from-black/70 via-black/20 to-transparent z-20 border-r border-white/5" />
              
              {/* Subtle page edge effect on the right */}
              <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-white/10 z-10" />
              
              {/* Hardcover texture/shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
              
              <img src={coverImage} alt="Capa de Gênesis" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <span className="rounded bg-brand-gold/20 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest text-brand-gold backdrop-blur-sm">
                  Gn
                </span>
                <h1 className="mt-2 font-display text-2xl font-extrabold text-white">Gênesis</h1>
                <p className="text-xs text-app-text-muted">O Livro das Origens</p>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex flex-col justify-between py-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                <Sparkles className="h-3.5 w-3.5" /> Livro das Origens
              </div>
              <h2 className="mt-4 font-display text-4xl font-extrabold text-app-text md:text-5xl lg:text-6xl">
                Gênesis
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-app-text-muted md:text-lg">
                Toda grande história tem um começo. Aqui começa a jornada da humanidade, a criação do universo e o estabelecimento das promessas eternas de Deus.
              </p>

              {/* Quick Stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                <StatItem icon={<BookOpen className="h-5 w-5" />} label="Capítulos" value="50 Capítulos" color="text-brand-primary" />
                <StatItem icon={<Compass className="h-5 w-5" />} label="Jornadas" value="4 Jornadas" color="text-brand-cyan" />
                <StatItem icon={<Clock className="h-5 w-5" />} label="Tempo Estimado" value="~4.5 horas" color="text-brand-gold" />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/biblioteca/genesis/jornada-1">
                <BdsButton size="lg" leadingIcon={<Play className="h-5 w-5 fill-current" />}>
                  Começar Jornada
                </BdsButton>
              </Link>
              <BdsButton
                variant="secondary"
                size="lg"
                onClick={onFavorite}
                leadingIcon={<Heart className={cn("h-5 w-5", isFavorited && "fill-brand-coral text-brand-coral")} />}
              >
                {isFavorited ? "Favoritado" : "Favoritar Livro"}
              </BdsButton>
              <BdsButton variant="ghost" size="lg" onClick={onShare} aria-label="Compartilhar">
                <Share2 className="h-5 w-5" />
              </BdsButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={cn("grid h-10 w-10 place-items-center rounded-xl bg-app-surface", color)}>
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-app-text-muted">{label}</div>
        <div className="font-display text-sm font-bold text-app-text">{value}</div>
      </div>
    </div>
  );
}