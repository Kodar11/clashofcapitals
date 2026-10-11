import { Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { PageIntro } from "@/components/page-layout";
import { mailto, routes, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: `How to permanently delete your ${site.name} account and the data associated with it, in the app or by request.`,
  alternates: { canonical: routes.deleteAccount },
};

const STEPS = [
  {
    title: "Open Settings",
    body: (
      <>
        Open {site.name}. On the home screen, tap your profile (your nickname, at the top) to open <strong>Settings</strong>.
      </>
    ),
  },
  {
    title: "Find the Danger zone",
    body: (
      <>
        Scroll to <strong>Danger zone</strong> and tap <strong>Delete Account</strong>.
      </>
    ),
  },
  {
    title: "Read and continue",
    body: (
      <>
        The app explains what will happen. Tap <strong>Continue</strong>.
      </>
    ),
  },
  {
    title: "Type DELETE to confirm",
    body: (
      <>
        Type <strong>DELETE</strong> and tap <strong>Delete forever</strong>. If your account is linked to Google, you may be asked to{" "}
        <strong>Confirm with Google &amp; delete</strong> first, to prove the account is yours.
      </>
    ),
  },
] as const;

const DELETED = [
  "Your sign-in and every active session",
  "Your profile: your Player ID and nickname",
  "The link to your Google account, if you added one (your Google account itself is not touched)",
  "Your friends list, friend requests and blocked players",
  "Your game and party invitations, and in-app notifications",
  "Your place in any matchmaking queue",
] as const;

const REQUEST_BODY = `Please delete my Clash of Capitals account.

Player ID (RR-XXXXXX):
Nickname:
Is the account linked to Google? (yes / no):
`;

export default function DeleteAccountPage() {
  return (
    <>
      <PageIntro eyebrow="Your data" title="Delete your account">
        <p>
          You can permanently delete your {site.name} account and the data tied to it at any time. The quickest way is inside the app. If you can’t open the
          app, you can ask us by email.
        </p>
      </PageIntro>

      <div className="wrap grid gap-14 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="max-w-prose">
          <section aria-labelledby="who-title" className="prose-doc">
            <h2 id="who-title" className="text-3xl text-ink">
              Who this is for
            </h2>
            <p>
              Everyone who plays {site.name} has an account, including guests: the app creates one the first time it opens. This page applies to guest accounts
              and to accounts linked to Google.
            </p>
            <p>
              Uninstalling the app is not the same as deleting your account. Uninstalling removes the app from your phone; only the steps below remove your
              account from our servers.
            </p>
          </section>

          <section aria-labelledby="in-app-title" className="mt-14">
            <h2 id="in-app-title" className="text-3xl text-ink">
              Delete it in the app
            </h2>
            <ol className="mt-7 border-t border-line">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-5 border-b border-line py-6">
                  <span aria-hidden className="font-display text-3xl leading-none text-gold-deep tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold tracking-normal text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-muted">
              Deletion happens straight away. The app tells you once our server has confirmed it, then starts over with a new, empty guest account. If
              something goes wrong, the app says so and your account stays exactly as it was.
            </p>
          </section>

          <section aria-labelledby="what-title" className="prose-doc mt-14">
            <h2 id="what-title" className="text-3xl text-ink">
              What gets deleted
            </h2>
            <ul>
              {DELETED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>This is permanent.</strong> It cannot be undone, and nobody, including you, can get that Player ID back.
            </p>

            <h2 id="kept-title" className="mt-14 text-3xl text-ink">
              What is not deleted straight away
            </h2>
            <ul>
              <li>
                <strong>A game you are in.</strong> A seat at a table is not part of your account. If you delete your account during a game, the game carries
                on and your seat, with the name you chose for that table, stays until the game ends. Games are temporary: they expire after 12 hours without
                activity and are then cleared from our database.
              </li>
              <li>
                <strong>Data on your phone.</strong> Financial Learning progress and a few preferences are stored only on your device. Uninstall the app or
                clear its data to remove them.
              </li>
              <li>
                <strong>Operational records.</strong> Limited technical records that do not contain your nickname or email address, such as matchmaking and
                voice usage records, and our providers’ backups and logs, may remain for a limited time for security and to keep the service running.
              </li>
            </ul>
            <p>
              For the full picture of what the game stores, see the <Link href={routes.privacy}>Privacy Policy</Link>.
            </p>
          </section>
        </div>

        <aside aria-labelledby="request-title" className="h-fit rounded-lg border border-line bg-card p-7 lg:sticky lg:top-24">
          <h2 id="request-title" className="text-2xl text-ink">
            Can’t open the app?
          </h2>
          <p className="mt-3 text-[0.9375rem] text-muted">
            If you no longer have the app, or the in-app steps fail, email us and we will delete the account for you and reply to confirm.
          </p>
          <ButtonLink href={mailto("Account deletion request", REQUEST_BODY)} className="mt-6 w-full">
            <Mail aria-hidden className="size-4" />
            Email a deletion request
          </ButtonLink>
          <p className="mt-3 text-center text-sm break-all text-muted">{site.supportEmail}</p>

          <h3 className="mt-7 font-sans text-sm font-semibold tracking-normal text-ink">Include in your email</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.9375rem] text-muted marker:text-gold-deep">
            <li>
              Your Player ID. It starts with <strong className="font-semibold text-ink">RR-</strong> and is shown in the app’s Settings.
            </li>
            <li>Your nickname.</li>
            <li>If the account is linked to Google, send the email from that Google address.</li>
          </ul>
          <p className="mt-5 text-[0.9375rem] text-muted">
            We may ask a question or two to confirm the account is yours. Never send passwords, verification codes or sign-in links. We will never ask for
            them.
          </p>
        </aside>
      </div>
    </>
  );
}
