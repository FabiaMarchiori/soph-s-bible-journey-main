/**
 * CharacterCard · LocationCard · ObjectCard
 * Consistent entity presentation cards for people, places and things.
 */
import { MapPin, BookOpen, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { UniversalCard } from "../cards/Cards";
import type { MockCharacter, MockLocation, MockObject } from "@/lib/bds-mocks";

export function CharacterCard({ character, onOpen, className }: { character: MockCharacter; onOpen?: () => void; className?: string }) {
  return (
    <UniversalCard interactive={!!onOpen} onClick={onOpen} className={cn("overflow-hidden", className)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={character.image} alt={character.name} loading="lazy" className="h-full w-full object-cover transition-smooth hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated to-transparent" />
      </div>
      <div className="space-y-3 p-4">
        <div>
          <div className="font-display text-lg font-semibold text-app-text">{character.name}</div>
          <div className="text-xs italic text-app-text-muted">"{character.meaning}"</div>
        </div>
        <p className="text-sm text-app-text-muted">{character.description}</p>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {character.books.map((b) => (
            <span key={b} className="inline-flex items-center gap-1 rounded-full bg-app-surface-high px-2 py-0.5 text-app-text-muted">
              <BookOpen className="h-3 w-3" /> {b}
            </span>
          ))}
          {character.family?.length ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-lavender/15 px-2 py-0.5 text-brand-lavender">
              <Users className="h-3 w-3" /> {character.family.join(", ")}
            </span>
          ) : null}
        </div>
        {character.facts.length > 0 && (
          <ul className="space-y-1 text-xs text-app-text-muted">
            {character.facts.map((f) => (
              <li key={f} className="flex items-start gap-1.5">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-brand-primary" /> {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </UniversalCard>
  );
}

export function LocationCard({ location, onOpen, className }: { location: MockLocation; onOpen?: () => void; className?: string }) {
  return (
    <UniversalCard interactive={!!onOpen} onClick={onOpen} className={cn("overflow-hidden", className)}>
      <div className="relative aspect-video overflow-hidden">
        <img src={location.image} alt={location.name} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-app-surface-elevated/95 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur">
          <MapPin className="h-3 w-3" /> Lugar
        </span>
      </div>
      <div className="space-y-2 p-4">
        <div className="font-display text-lg font-semibold text-app-text">{location.name}</div>
        <p className="text-sm text-app-text-muted">{location.description}</p>
        <div className="text-xs text-brand-lavender">Importância: {location.importance}</div>
      </div>
    </UniversalCard>
  );
}

export function ObjectCard({ object, onOpen, className }: { object: MockObject; onOpen?: () => void; className?: string }) {
  return (
    <UniversalCard interactive={!!onOpen} onClick={onOpen} className={cn("overflow-hidden", className)}>
      <div className="relative aspect-square overflow-hidden">
        <img src={object.image} alt={object.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="space-y-1 p-3">
        <div className="truncate font-display text-sm font-semibold text-app-text">{object.name}</div>
        <div className="line-clamp-2 text-xs text-app-text-muted">{object.description}</div>
        <div className="text-[11px] text-brand-lavender">{object.reference}</div>
      </div>
    </UniversalCard>
  );
}
