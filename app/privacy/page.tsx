import type { Metadata } from "next";
import Link from "next/link";
import { DocumentBody, PageIntro, type DocSection } from "@/components/page-layout";
import { mailto, routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, shares and deletes information in the mobile game and on this website.`,
  alternates: { canonical: routes.privacy },
};

const Email = () => <a href={mailto("Privacy question")}>{site.supportEmail}</a>;

const sections: readonly DocSection[] = [
  {
    id: "scope",
    title: "Scope",
    content: (
      <>
        <p>
          This policy explains what information the {site.name} mobile game (the “app”) and this website handle, why, who it is shared with, and the choices
          you have. “We” and “us” mean the developer of {site.name}.
        </p>
        <p>
          It covers the app and this website. It does not cover services run by others that you choose to use with the app, such as Google sign-in, which
          have their own policies.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>The app is built to work with very little personal information. In summary, it handles:</p>
        <ul>
          <li>
            <strong>An account record</strong>: a randomly generated account identifier, a public Player ID (for example <em>RR-ABC234</em>), a nickname, and the
            dates the account was created and updated.
          </li>
          <li>
            <strong>Sign-in details, only if you link Google</strong>: the Google account identity you choose to connect.
          </li>
          <li>
            <strong>Gameplay data</strong>: the games you join and what happens in them.
          </li>
          <li>
            <strong>Social data</strong>: friends, friend requests, blocks, invitations, parties and in-app notifications.
          </li>
          <li>
            <strong>Voice chat data</strong>, only if you use voice chat: live audio while you hold the talk button, and basic usage records.
          </li>
          <li>
            <strong>Technical data</strong> that our infrastructure providers process to deliver the service, such as IP address and request times.
          </li>
        </ul>
        <p>
          The app does not include advertising, analytics or crash-reporting software, and it does not ask for your contacts, location, photos or files. We do
          not sell personal information.
        </p>
      </>
    ),
  },
  {
    id: "information-you-provide",
    title: "Information you provide",
    content: (
      <ul>
        <li>
          <strong>Nickname.</strong> A nickname is generated for you and you can change it (3 to 20 characters). Nicknames are checked against a list of
          disallowed words. Please do not use your real full name or other personal details as a nickname.
        </li>
        <li>
          <strong>Name in a game.</strong> When you create or join a game you enter the name shown at that table (up to 20 characters).
        </li>
        <li>
          <strong>Player IDs you enter</strong> to find and add friends.
        </li>
        <li>
          <strong>Messages you send us.</strong> If you email support, we receive your email address and whatever you include in the message.
        </li>
      </ul>
    ),
  },
  {
    id: "accounts",
    title: "Guest accounts and optional sign-in",
    content: (
      <>
        <p>
          You do not need to sign in to play. The first time you open the app it creates an anonymous guest account and a profile for it. The session for that
          account is kept in your device’s secure storage.
        </p>
        <p>
          A guest account exists only on the device that created it. If you uninstall the app or lose that session before linking Google, you may permanently
          lose access to the account.
        </p>
        <p>
          You can choose to <strong>link a Google account</strong> so you can restore your player on another phone. Sign-in happens in your browser through
          Google and our authentication provider. When you link Google, the authentication provider stores the Google identity you connected, which includes
          the email address and basic profile information Google shares for sign-in. The app uses it to recognise you when you sign in. It does not show your
          email address to other players, and we never receive your Google password.
        </p>
      </>
    ),
  },
  {
    id: "gameplay",
    title: "Gameplay and multiplayer information",
    content: (
      <>
        <h3>Games</h3>
        <p>
          To run a game, our servers store the game itself: its code and settings, each player’s seat and chosen name, balances, positions, properties,
          buildings, loans, auctions and bids, trade offers, and a history of the actions and in-game money transfers. In-game money is play money and has no
          real-world value.
        </p>
        <p>
          Your seat at a table is tied to a random token created on your device. Our servers store only a one-way hash of that token, never the token itself.
        </p>
        <h3>Friends, invitations and presence</h3>
        <p>
          If you use the social features, we store your friendships, pending friend requests, the players you have blocked, game and party invitations, and
          in-app notifications. While the app is open, your friends can see whether you are online.
        </p>
        <h3>Play Online</h3>
        <p>
          If you queue for a public game, we store your place in the queue, your party if you are in one, and the match you were placed in. We keep operational
          records of matchmaking activity to keep the system working; these do not contain nicknames or email addresses.
        </p>
        <h3>Reactions and preset messages</h3>
        <p>
          Quick reactions and preset messages are sent to the other players in your game and are not stored. We keep only the time you last sent one, to
          enforce a short cooldown. The app has no free-text chat.
        </p>
        <h3>Information stored only on your device</h3>
        <p>
          Your Financial Learning progress and a few preferences, such as whether you have seen the introduction, stay on your device and are not sent to us.
        </p>
      </>
    ),
  },
  {
    id: "voice-and-permissions",
    title: "Voice chat and device permissions",
    content: (
      <>
        <h3>Voice chat</h3>
        <p>
          Voice chat is optional and experimental. It is available only in private games where the host has turned it on, never in public matches. It is
          audio only and uses push-to-talk: your microphone audio is transmitted only while you hold the talk button, and stops when you release it, leave
          voice, or send the app to the background.
        </p>
        <p>
          Live audio is carried by our voice provider, Agora, and is heard by the other players in that game’s voice channel. The app does not record or store
          voice audio, and we do not use Agora’s recording features. Agora processes audio and connection data in real time to deliver the call, under its own
          privacy policy. Other players could record what they hear using their own devices; we cannot control that.
        </p>
        <p>
          To manage limits and costs, we store basic voice usage records: which game and seat connected, when, for how long, and how many times it
          reconnected. These records do not contain audio.
        </p>
        <h3>Permissions the app requests</h3>
        <ul>
          <li>
            <strong>Microphone</strong>: only for voice chat. If you decline, you can still listen and play.
          </li>
          <li>
            <strong>Camera</strong>: only to scan a game’s QR code so you can join it. The camera view is read on your device to find the code; the app does not
            save or upload photos or video.
          </li>
          <li>
            <strong>Audio settings and Bluetooth</strong>: so voice chat can use your speaker or a connected headset.
          </li>
        </ul>
        <p>You can withdraw any permission at any time in your device settings.</p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    content: (
      <>
        <p>We use the information described above to:</p>
        <ul>
          <li>create and maintain your account and let you restore it;</li>
          <li>run games fairly: apply the rules on the server, keep every player’s view in sync, and prevent cheating;</li>
          <li>provide friends, invitations, matchmaking and voice chat;</li>
          <li>protect the service, for example through rate limits, nickname checks and blocking;</li>
          <li>diagnose errors and keep the service reliable;</li>
          <li>respond when you contact us; and</li>
          <li>comply with legal obligations.</li>
        </ul>
        <p>We do not use your information for advertising or to build marketing profiles.</p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Service providers and data sharing",
    content: (
      <>
        <h3>What other players can see</h3>
        <p>Because this is a multiplayer game, some information is visible to other players as part of play:</p>
        <ul>
          <li>the name you use at a table, and your nickname and Player ID where you share them or appear in a lobby, friends list or invitation;</li>
          <li>everything you do in a game you share with them: your moves, balance, properties, bids and trades;</li>
          <li>your reactions and preset messages;</li>
          <li>whether you are online, if they are your friend; and</li>
          <li>your voice, while you hold the talk button in a voice-enabled private game.</li>
        </ul>
        <p>Your email address, account identifier and sign-in details are never shown to other players.</p>
        <h3>Providers that process data for us</h3>
        <ul>
          <li>
            <strong>Supabase</strong> provides authentication, the database, real-time updates and server functions. All account, gameplay and social data
            described in this policy is stored there.
          </li>
          <li>
            <strong>Agora</strong> carries live voice audio when you use voice chat.
          </li>
          <li>
            <strong>Google</strong> provides sign-in if you choose to link a Google account, and distributes the app through Google Play.
          </li>
          <li>
            <strong>Our website host</strong> serves this website and processes standard request data, such as IP addresses, to do so.
          </li>
        </ul>
        <p>
          These providers process information on our behalf or under their own terms and privacy policies. We may also disclose information if the law
          requires it, or to protect the rights and safety of players and the service.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Data storage and security",
    content: (
      <>
        <p>We take reasonable steps to protect your information, including:</p>
        <ul>
          <li>keeping your session in your device’s secure, encrypted storage;</li>
          <li>encrypting connections between the app and our servers;</li>
          <li>storing only a one-way hash of the token that identifies your seat in a game;</li>
          <li>database access rules that stop the app from reading other players’ account data; and</li>
          <li>running the game’s rules on the server, so balances and ownership cannot be changed from a phone.</li>
        </ul>
        <p>No system is perfectly secure, and we cannot guarantee absolute security.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Retention",
    content: (
      <ul>
        <li>
          <strong>Your account and profile</strong> are kept until you delete your account. Guest accounts that are never linked and are no longer used may be
          removed.
        </li>
        <li>
          <strong>Games are temporary.</strong> A game expires after 12 hours without activity, and expired games are removed from our database by routine
          clean-up.
        </li>
        <li>
          <strong>Friend requests</strong> expire after 30 days and <strong>invitations</strong> after 15 minutes if they are not answered.
        </li>
        <li>
          <strong>Operational records</strong>, such as matchmaking and voice usage records and provider logs, are kept only as long as needed to run and
          protect the service.
        </li>
        <li>
          <strong>Support emails</strong> are kept for as long as needed to handle your request.
        </li>
      </ul>
    ),
  },
  {
    id: "account-deletion",
    title: "Account deletion and associated data",
    content: (
      <>
        <p>
          You can delete your account at any time from inside the app, under <strong>Settings → Danger zone → Delete Account</strong>. Deletion is permanent
          and takes effect as soon as the server confirms it. It removes your sign-in, your profile (Player ID and nickname), any link to Google, and your
          friends, requests, blocks, invitations and notifications.
        </p>
        <p>
          Full instructions, exactly what is and is not removed, and how to request deletion if you cannot open the app are on the{" "}
          <Link href={routes.deleteAccount}>Delete Account page</Link>.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    title: "Your rights and choices",
    content: (
      <>
        <ul>
          <li>Change your nickname in the app’s Settings.</li>
          <li>Play as a guest without linking any other account.</li>
          <li>Block another player, or remove a friend.</li>
          <li>Decline or withdraw the microphone and camera permissions in your device settings.</li>
          <li>
            Delete your account and its data, as described on the <Link href={routes.deleteAccount}>Delete Account page</Link>.
          </li>
        </ul>
        <p>
          You can also ask us what information we hold about your account, or ask us to correct it, by emailing <Email />. Depending on where you live, the law
          may give you additional rights over your personal information; contact us and we will respond to your request.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children’s privacy",
    content: (
      <p>
        {site.name} is a general-audience game and is not directed at children under 13. We do not knowingly collect personal information from children under
        13. If you believe a child has given us personal information, contact us at <Email /> and we will delete it.
      </p>
    ),
  },
  {
    id: "international",
    title: "International processing",
    content: (
      <p>
        Our service providers may store and process information on servers located outside the country where you live, where data protection laws may differ
        from yours. By using the app you understand that your information may be processed in those locations.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy as the game changes. When we do, we will post the new version on this page and update the effective date at the top. If a
        change is significant, we will take reasonable steps to let players know.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Questions about this policy or your information? Email <Email /> or visit the <Link href={routes.contact}>Contact page</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy Policy">
        <p>What the game knows about you, why, and how to remove it. Written to be read.</p>
        <p className="mt-3 text-base">Effective {site.legalEffectiveDate}</p>
      </PageIntro>
      <DocumentBody sections={sections} />
    </>
  );
}
