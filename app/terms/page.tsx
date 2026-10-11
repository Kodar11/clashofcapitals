import type { Metadata } from "next";
import Link from "next/link";
import { DocumentBody, PageIntro, type DocSection } from "@/components/page-layout";
import { mailto, routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that apply when you download and play ${site.name}.`,
  alternates: { canonical: routes.terms },
};

const sections: readonly DocSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    content: (
      <>
        <p>
          These terms are an agreement between you and the developer of {site.name} (“we”, “us”). They apply to the {site.name} mobile game and this website
          (together, the “service”).
        </p>
        <p>
          By downloading, opening or playing the game you agree to these terms and to our <Link href={routes.privacy}>Privacy Policy</Link>. If you do not
          agree, please do not use the service.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <p>
        You may use the service only if you can form a binding agreement under the law that applies to you. If you are under the age of majority where you
        live, you need a parent’s or guardian’s permission, and they agree to these terms on your behalf. The game is not directed at children under 13.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts and guest accounts",
    content: (
      <>
        <p>
          The game creates a guest account for you the first time you open it. A guest account lives only on the device that created it. If you uninstall the
          game, clear its data or lose your device before linking a Google account, you may permanently lose access to that account, and we may be unable to
          recover it.
        </p>
        <p>
          You can link a Google account to restore your player on another device. You are responsible for keeping your device and your Google account secure,
          and for what happens under your account.
        </p>
      </>
    ),
  },
  {
    id: "conduct",
    title: "Nicknames and player conduct",
    content: (
      <>
        <p>You choose a nickname and the name you use at each table. Names must not:</p>
        <ul>
          <li>be offensive, hateful, sexually explicit or harassing;</li>
          <li>impersonate another person, or suggest you are staff, a moderator or an administrator; or</li>
          <li>include personal information about you or anyone else.</li>
        </ul>
        <p>We may refuse or change a name that breaks these rules. Treat other players with respect, in the game and in voice chat.</p>
      </>
    ),
  },
  {
    id: "fair-play",
    title: "Fair play and misuse",
    content: (
      <>
        <p>To keep the game fair and available for everyone, you agree not to:</p>
        <ul>
          <li>cheat, or use bots, scripts, modified versions of the game or other automation;</li>
          <li>exploit bugs instead of reporting them;</li>
          <li>interfere with other players’ games, or with our servers and networks;</li>
          <li>attempt to access accounts, data or systems that are not yours;</li>
          <li>reverse engineer the game, except where the law expressly allows it; or</li>
          <li>use the service for anything unlawful.</li>
        </ul>
      </>
    ),
  },
  {
    id: "multiplayer",
    title: "Multiplayer interactions",
    content: (
      <>
        <p>
          {site.name} is played with other people. Other players can see the name you use, your moves and the state of your game. In private games where the
          host has enabled voice chat, they can hear you while you hold the talk button.
        </p>
        <p>
          We do not control what other players say or do, and we are not responsible for their conduct. You can block a player in the app, and you can report
          a problem to us at <a href={mailto("Report a player")}>{site.supportEmail}</a>.
        </p>
        <p>
          <strong>The money in the game is play money.</strong> It has no real-world value, cannot be bought, sold or exchanged for anything outside the game,
          and the game does not offer real-money gambling or prizes.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property and permitted use",
    content: (
      <>
        <p>
          The game, including its name, logo, artwork, text and software, belongs to us or our licensors and is protected by law. We give you a personal,
          non-exclusive, non-transferable and revocable permission to install and play the game for your own non-commercial entertainment.
        </p>
        <p>You may not copy, modify, redistribute, sell or rent the game or any part of it, or use our name and logo in a way that suggests we endorse you.</p>
      </>
    ),
  },
  {
    id: "availability",
    title: "Service availability and updates",
    content: (
      <>
        <p>
          We work to keep the game running, but we do not promise that it will always be available, uninterrupted or free of errors. Games are temporary and
          expire after a period of inactivity. Features may change, be limited or be withdrawn; some, such as voice chat, are experimental and may be
          switched off or restricted at any time.
        </p>
        <p>We may release updates, and you may need to install them to keep playing.</p>
      </>
    ),
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    content: (
      <p>
        If you seriously or repeatedly break these terms, we may limit features, remove you from games, or suspend or close your account. Where it is
        reasonable to do so, we will tell you why. You can stop using the service at any time.
      </p>
    ),
  },
  {
    id: "account-deletion",
    title: "Account deletion",
    content: (
      <p>
        You can permanently delete your account from inside the game at any time. The steps, and what is removed, are on the{" "}
        <Link href={routes.deleteAccount}>Delete Account page</Link>. Deleting your account cannot be undone, and your Player ID cannot be recovered.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    content: (
      <p>
        The service relies on services provided by others, including Google Play for distribution, Google for optional sign-in, Supabase for our backend and
        Agora for voice chat. Your use of those services may be subject to their own terms and privacy policies. We are not responsible for services we do
        not operate.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers and limitation of liability",
    content: (
      <>
        <p>
          The service is provided “as is” and “as available”. To the extent the law allows, we make no promises about it beyond those in these terms,
          including that it will meet your expectations or that game data will always be preserved.
        </p>
        <p>
          To the extent the law allows, we are not liable for indirect or consequential losses, or for loss of data, arising from your use of the service.
          Nothing in these terms limits any liability that cannot be limited by law, or any rights you have as a consumer that cannot be waived.
        </p>
        <p>
          The Financial Learning stories and the game’s loans, insurance and markets are simplified for play. They are for entertainment and general learning
          only, and are not financial advice.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms as the game changes. We will post the new version on this page and update the effective date at the top. If you keep
        playing after a change takes effect, you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about these terms? Email <a href={mailto("Question about the terms")}>{site.supportEmail}</a> or visit the{" "}
        <Link href={routes.contact}>Contact page</Link>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Terms & Conditions">
        <p>The ground rules for playing {site.name}, in plain language.</p>
        <p className="mt-3 text-base">Effective {site.legalEffectiveDate}</p>
      </PageIntro>
      <DocumentBody sections={sections} />
    </>
  );
}
