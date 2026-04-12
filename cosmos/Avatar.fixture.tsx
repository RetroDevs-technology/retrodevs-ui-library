import BaseAvatar from "../src/components/modules/base-avatar"
import { useFixtureInput, useFixtureSelect } from "./cosmos-playground"
import { FixtureWrapper } from "./FixtureWrapper"

export default function AvatarShowcase() {
  const [imageUrl] = useFixtureInput("avatarImageUrl", "https://github.com/shadcn.png")
  const [alt] = useFixtureInput("avatarAltText", "User profile")
  const [size] = useFixtureSelect("avatarSize", {
    options: ["sm", "md", "lg", "xl", "huge"],
    defaultValue: "md",
  })
  const [useImage] = useFixtureInput("avatarShowImage", true)
  const [initials] = useFixtureInput("avatarFallbackInitials", "JD")

  return (
    <FixtureWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Live controls</h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Toggle image vs fallback, URL, alt, size, and fallback initials (when no image).
        </p>
        <BaseAvatar
          src={useImage ? imageUrl : null}
          alt={alt}
          size={size as "sm" | "md" | "lg" | "xl" | "huge"}
          fallback={<span>{initials}</span>}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Different Sizes</h2>
        <div className="flex items-center gap-4">
          <BaseAvatar size="sm" />
          <BaseAvatar size="md" />
          <BaseAvatar size="lg" />
          <BaseAvatar size="xl" />
          <BaseAvatar size="huge" />
        </div>
      </section>
    </FixtureWrapper>
  )
}
