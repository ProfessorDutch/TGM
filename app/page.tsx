"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Menu, Play, Quote, Send, X } from "lucide-react";
import { episodes, thoughtcasts } from "./generated-content";

type View =
  | { page: "home" }
  | { page: "stories" }
  | { page: "episode"; slug: string }
  | { page: "thoughtcasts" }
  | { page: "thoughtcast"; slug: string }
  | { page: "mustard" }
  | { page: "support" }
  | { page: "story" };

function Mark() {
  return <span className="mark" aria-hidden="true"><img src="/brand/genesis-moment-mark.png" alt="" /></span>;
}

function Header({ go }: { go: (view: View) => void }) {
  const [open, setOpen] = useState(false);
  const navigate = (view: View) => {
    go(view);
    setOpen(false);
  };
  return (
    <header className="site-header">
      <button className="brand" onClick={() => navigate({ page: "home" })} aria-label="The Genesis Moment home">
        <img className="brand-logo" src="/brand/genesis-moment-horizontal.png" alt="The Genesis Moment Podcast" />
      </button>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? "nav open" : "nav"}>
        <button onClick={() => navigate({ page: "stories" })}>Stories</button>
        <button onClick={() => navigate({ page: "thoughtcasts" })}>Thoughtcasts</button>
        <button onClick={() => navigate({ page: "mustard" })}>The Mustard Seed</button>
        <button onClick={() => navigate({ page: "story" })}>Tell Your Story</button>
        <button className="nav-cta" onClick={() => navigate({ page: "support" })}>Support the Ministry</button>
      </nav>
    </header>
  );
}

function StoryCard({ episode, onOpen }: { episode: typeof episodes[number]; onOpen: () => void }) {
  return (
    <article className="story-card" onClick={onOpen}>
      <img src={episode.image} alt="" />
      <div><span className="eyebrow">{episode.tag}</span><h3>{episode.title}</h3><p>{episode.guest} · {episode.duration}</p></div>
      <button className="play" aria-label={`Open ${episode.title}`}><Play size={16} fill="currentColor" /></button>
    </article>
  );
}

function Home({ go }: { go: (view: View) => void }) {
  const featured = episodes.find((item) => item.featured) ?? episodes[0];
  return (
    <>
      <section className="hero">
        <div className="hero-photo" style={{ backgroundImage: `url("${featured.image}")` }} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow">THE STORY BEFORE THE SUCCESS</span>
          <h1>Who saw something in you before you could see it in yourself?</h1>
          <p>Before the confidence. Before the company. Before your life looked like proof. There was a person, a moment, or a small act of faith that changed what you believed was possible.</p>
          <div className="actions">
            <button className="primary" onClick={() => go({ page: "episode", slug: featured.slug })}><Play size={15} fill="currentColor" /> Watch Episode</button>
            <button className="secondary" onClick={() => go({ page: "story" })}>Tell Your Story <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>
      <main>
        <section className="opening-sequence">
          <span className="eyebrow">GO BACK FAR ENOUGH</span>
          <div className="opening-stage">
            <h2>There was a version of you who did not know how the story would end.</h2>
            <div className="opening-memory">
              <p>You were scared. Behind. Ashamed that you needed help. Trying to look certain while quietly wondering whether you had already wasted your chance.</p>
              <p>Then somebody treated that unfinished version of you like you were still worth believing in.</p>
            </div>
          </div>
          <p className="genesis-definition"><span>The Genesis Moment</span> is the moment someone’s belief changed what you thought was possible.</p>
        </section>
        <section className="featured section-grid">
          <div>
            <span className="eyebrow">ONE BEGINNING. TOLD COMPLETELY.</span>
            <h2>“{featured.title}”</h2>
            <p className="dek">{featured.summary}</p>
            <button className="text-link" onClick={() => go({ page: "episode", slug: featured.slug })}>Watch the story →</button>
          </div>
          <div className="quote-frame"><img className="quote-photo" src={featured.image} alt="" /><span>{featured.guest}<br /><small>{featured.business} · {featured.location}</small></span></div>
        </section>
        <section className="late-story">
          <span className="eyebrow">MOST SUCCESS STORIES START TOO LATE</span>
          <div className="late-story-grid">
            <h2>They begin with the company, the customers, the house, the trucks—the finished version.</h2>
            <div>
              <p>That version can be impressive. It can also create distance.</p>
              <p>A person standing at the beginning looks at the finished life and thinks, <em>That has nothing to do with someone like me.</em></p>
              <p>So we go back. To the rejection. The bad decisions. The fear. The loneliness. The days the person you admire still felt small.</p>
              <strong>Success is not the story. It lets us see what grew.</strong>
            </div>
          </div>
        </section>
        <section className="belief-section">
          <div className="belief-heading">
            <span className="eyebrow">BELIEF IS NOT AN IDEA. IT TAKES A FORM.</span>
            <h2>Sometimes the thing that saved your future looked ordinary to everyone else.</h2>
          </div>
          <div className="belief-flow">
            <article><h3>They made room.</h3><p>A couch. A spare room. An hour at the end of a long day. Somewhere you could stop surviving long enough to imagine again.</p></article>
            <article><h3>They gave you evidence.</h3><p>A set of tools. An introduction. A first job. Something solid enough to answer the voice saying you would never become more.</p></article>
            <article><h3>They carried what you could not.</h3><p>The bills. The children. The fear you could not say out loud. They held part of the weight while you learned how to stand.</p></article>
            <article><h3>They kept seeing you.</h3><p>Not as your mistake. Not as your worst season. As the person you might still become—even when you could not see that person yourself.</p></article>
          </div>
          <p className="belief-close">Sometimes a life changes because one person believes in who you are becoming long enough for you to believe it too.</p>
        </section>
        <section className="content-section">
          <div className="section-heading"><div><span className="eyebrow">MORE GENESIS MOMENTS</span><h2>The stories before the success.</h2></div><button className="text-link" onClick={() => go({ page: "stories" })}>Browse all stories →</button></div>
          <div className="story-grid">{episodes.slice(0, 3).map((episode) => <StoryCard key={episode.slug} episode={episode} onOpen={() => go({ page: "episode", slug: episode.slug })} />)}</div>
        </section>
        <section className="what-the-podcast-does">
          <span className="eyebrow">WHAT WE ARE REALLY ASKING</span>
          <div>
            <h2>Not just how you won.<br />Who were you before you knew you could?</h2>
            <p>What were you afraid of? What had you started believing about yourself? Who stayed beside you when your life gave them no proof? Who prayed, sacrificed, opened a door, or called something out of you that you had buried?</p>
            <strong>What exists today because they did?</strong>
          </div>
        </section>
        <section className="thoughtcast-why">
          <span className="eyebrow">WHY THOUGHTCASTS EXIST</span>
          <div className="thoughtcast-why-grid">
            <h2>A story shows you what happened.<br />A true sentence can show you what happened inside.</h2>
            <div><p>Thoughtcasts are short spoken pieces about faith, shame, grief, anger, identity, family, forgiveness, belief, and purpose.</p><p>The podcast preserves the whole story. A Thoughtcast pulls one truth from it, gives that truth language, and lets it stand long enough for you to recognize yourself.</p><button className="text-link" onClick={() => go({ page: "thoughtcasts" })}>Explore Thoughtcasts →</button></div>
          </div>
        </section>
        <section className="path-river" aria-label="Explore The Genesis Moment">
          <span className="eyebrow">WHERE DO YOU NEED TO BEGIN?</span>
          <button onClick={() => go({ page: "stories" })}><small>LISTEN TO A BEGINNING</small><strong>Genesis Moments</strong><em>Meet the person before the proof—and the person whose belief helped change the ending.</em><span>Explore stories →</span></button>
          <button onClick={() => go({ page: "thoughtcasts" })}><small>NAME WHAT HAPPENED INSIDE</small><strong>Thoughtcasts</strong><em>Give language to the faith, shame, grief, identity, and healing living beneath the visible story.</em><span>Hear a Thoughtcast →</span></button>
          <button onClick={() => go({ page: "mustard" })}><small>PLANT IT FORWARD</small><strong>The Mustard Seed</strong><em>Turn recognition into relationship, training, exposure, and a real opportunity for someone still at the beginning.</em><span>Enter the mission →</span></button>
          <button className="support-path" onClick={() => go({ page: "support" })}><small>HELP CARRY THE CALLING</small><strong>Support the Ministry</strong><em>Fund the people, programs, and opportunities that allow belief to take a tangible form.</em><span>Give once or monthly →</span></button>
        </section>
      </main>
    </>
  );
}

function Stories({ go }: { go: (view: View) => void }) {
  const [filter, setFilter] = useState("ALL");
  const tags = ["ALL", ...Array.from(new Set(episodes.map((item) => item.tag)))];
  const visible = filter === "ALL" ? episodes : episodes.filter((item) => item.tag === filter);
  return <main className="page"><div className="page-intro"><span className="eyebrow">GENESIS MOMENTS</span><h1>The Stories<br />Before the Success</h1><p>Real people. Defining moments. Lasting impact.</p></div><div className="filters">{tags.map((tag) => <button className={filter === tag ? "active" : ""} onClick={() => setFilter(tag)} key={tag}>{tag}</button>)}</div><div className="story-list">{visible.map((episode) => <StoryCard key={episode.slug} episode={episode} onOpen={() => go({ page: "episode", slug: episode.slug })} />)}</div></main>;
}

function Episode({ slug, go }: { slug: string; go: (view: View) => void }) {
  const episode = episodes.find((item) => item.slug === slug) ?? episodes[0];
  return (
    <main className="page episode-page">
      <span className="eyebrow">{episode.tag}</span><h1>{episode.title}</h1><p className="meta">{episode.guest} · {episode.business} · {episode.location}</p>
      <div className="video-frame episode-still" style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.75),transparent 60%),url("${episode.image}")` }}>
        {episode.mediaUrl ? <a className="video-play" href={episode.mediaUrl} target="_blank" rel="noreferrer" aria-label="Play episode"><Play fill="currentColor" /></a> : <span className="coming-soon">EPISODE COMING SOON</span>}<span>{episode.duration}</span>
      </div>
      <blockquote><Quote /><span>“{episode.quote}”</span></blockquote>
      <div className="article-grid"><article><span className="eyebrow">BEFORE THERE WAS PROOF</span>{episode.body.split("\n\n").map((p) => <p key={p}>{p}</p>)}</article><aside><span className="eyebrow">KEEP EXPLORING</span><h3>One idea worth stopping for.</h3><button className="text-link" onClick={() => go({ page: "thoughtcasts" })}>Browse Thoughtcasts →</button></aside></div>
      <section className="mustard-strip"><Mark /><div><span className="eyebrow">THE MUSTARD SEED</span><h3>Someone believed before there was proof. Whose beginning can this story change next?</h3></div><button className="secondary" onClick={() => go({ page: "mustard" })}>Learn More</button></section>
    </main>
  );
}

function Thoughtcasts({ go }: { go: (view: View) => void }) {
  const [filter, setFilter] = useState("ALL");
  const tags = ["ALL", ...Array.from(new Set(thoughtcasts.map((item) => item.tag)))];
  const visible = filter === "ALL" ? thoughtcasts : thoughtcasts.filter((item) => item.tag === filter);
  return <main className="page"><div className="page-intro"><span className="eyebrow">THOUGHTCASTS</span><h1>One Idea Worth<br />Stopping For.</h1><p>Short direct-to-camera pieces about faith, identity, failure, relationships, grief, belief, and the things that shape who we become.</p></div><div className="filters">{tags.map((tag) => <button className={filter === tag ? "active" : ""} onClick={() => setFilter(tag)} key={tag}>{tag}</button>)}</div><div className="thought-grid">{visible.map((item) => <article className="thought-card" key={item.slug} onClick={() => go({ page: "thoughtcast", slug: item.slug })}><div className="camera-still" style={{ backgroundImage: `url("${item.image}")` }}><span className="camera-label">{item.duration}</span><button className="play" aria-label={`Open ${item.title}`}><Play fill="currentColor" /></button></div><span className="eyebrow">{item.tag}</span><h2>{item.title}</h2></article>)}</div></main>;
}

function Thoughtcast({ slug }: { slug: string }) {
  const item = thoughtcasts.find((thought) => thought.slug === slug) ?? thoughtcasts[0];
  return <main className="page thought-detail"><span className="eyebrow">{item.tag} · THOUGHTCAST</span><h1>{item.title}</h1><div className="video-frame camera-video" style={{ backgroundImage: `linear-gradient(0deg,rgba(0,0,0,.72),transparent),url("${item.image}")` }}>{item.mediaUrl ? <a className="video-play" href={item.mediaUrl} target="_blank" rel="noreferrer"><Play fill="currentColor" /></a> : <span className="coming-soon">VIDEO COMING SOON</span>}<span>{item.duration}</span></div><article className="transcript">{item.body.split("\n\n").map((p, index) => index === item.body.split("\n\n").length - 1 ? <strong key={p}>{p}</strong> : <p key={p}>{p}</p>)}</article></main>;
}

function Mustard({ go }: { go: (view: View) => void }) {
  return <main className="page"><section className="mustard-hero"><Mark /><span className="eyebrow">THE MUSTARD SEED</span><h1>A young person cannot become what they have never learned to imagine.</h1><p>The Mustard Seed exists to make the distance between “someone like them” and “someone like me” smaller.</p></section><div className="mustard-photo" /><section className="mustard-distance"><span className="eyebrow">THE DISTANCE SUCCESS CAN CREATE</span><div><h2>A polished life can inspire a young person. It can also make them feel smaller.</h2><p>They see the business, the confidence, the family, the finished version. They compare it to the life they are standing in now—the confusion, the mistakes, the money that is not there, the adults who did not stay.</p><p>And they decide the person on the screen was always different.</p><strong>“That story has nothing to do with someone like me.”</strong></div></section><section className="mustard-recognition"><div><span className="eyebrow">SO WE SHOW THEM THE BEGINNING</span><h2>The part that looks like their life.</h2></div><blockquote><span>“I hated school.”<br />“I lived with my mom.”<br />“I screwed up.”<br />“I had no money.”<br />“Someone bought my first tools.”<br />“Someone still gave me a chance.”</span></blockquote><p>Now the distance is smaller. The person they admired did not begin as the finished version. They began uncertain, embarrassed, angry, afraid, and unfinished too.</p></section><section className="ministry-purpose"><span className="eyebrow">THE STORY IS WHERE RECOGNITION BEGINS</span><h2>The ministry carries that recognition into real life.</h2><p>A young person may need a story before they can imagine a future. Then they need people who are willing to help them move toward it.</p><p>The Mustard Seed connects faith and purpose to mentorship, practical education, skilled trades, business relationships, and opportunities to work. Not an audience watching from a distance. A community willing to come close enough to make belief tangible.</p></section><section className="seed-movement"><span className="eyebrow">WHAT A SEED CAN BECOME</span><article><h3>First, they recognize themselves.</h3><p>A beginning sounds like their own. Success stops belonging only to people who seemed destined for it.</p></article><article><h3>Then the story becomes evidence.</h3><p>A hard home, a mistake, a late start, or a painful season may explain part of their life. It does not have to name their identity.</p></article><article><h3>Someone comes close enough to know them.</h3><p>A mentor, a business owner, an educator, or another steady adult sees the person—not merely the problem they are carrying.</p></article><article><h3>Belief takes a tangible form.</h3><p>A conversation. Training. Exposure to a trade. An introduction. A first job. A real next step where there used to be only distance.</p></article></section><section className="seed-definition"><Mark /><p>Someone planted faith, confidence, opportunity, or the idea that your life could be larger than your circumstances.</p><h2>The Genesis Moment preserves what they planted in you.<br />The Mustard Seed helps plant it again.</h2></section><section className="mustard-callout"><p>The part of your story you usually leave out may be the part someone else needs most.</p><h2>Help carry the calling forward.</h2><div className="actions"><button className="primary" onClick={() => go({ page: "support" })}>Support the Ministry</button><button className="secondary" onClick={() => go({ page: "story" })}>Nominate Someone</button></div></section></main>;
}

function GivingForm() {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("monthly");
  const [amount, setAmount] = useState("33");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const givingUrl = process.env.NEXT_PUBLIC_GIVING_URL;
  const choices = frequency === "monthly" ? ["11", "33", "77", "150"] : ["50", "100", "250", "500"];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
    try {
      const response = await fetch("/forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!response.ok) throw new Error("Submission failed");
      if (givingUrl) {
        window.location.assign(givingUrl);
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") return <div className="giving-thanks"><Mark /><h2>Your commitment matters.</h2><p>We received your giving intention. We will follow up with the secure way to complete it.</p></div>;
  return <form className="giving-form" name="support-the-ministry" onSubmit={submit}><input type="hidden" name="form-name" value="support-the-ministry" /><input type="hidden" name="frequency" value={frequency} /><section className="giving-frequency" aria-label="Gift frequency"><button type="button" className={frequency === "one-time" ? "active" : ""} onClick={() => { setFrequency("one-time"); setAmount("100"); }}>One-Time Gift</button><button type="button" className={frequency === "monthly" ? "active" : ""} onClick={() => { setFrequency("monthly"); setAmount("33"); }}>Monthly Commitment</button></section><div className="amount-line">{choices.map((choice) => <button type="button" key={choice} className={amount === choice ? "active" : ""} onClick={() => setAmount(choice)}>${choice}</button>)}<label>Other $<input name="amount" value={amount} onChange={(event) => setAmount(event.target.value.replace(/\D/g, ""))} inputMode="numeric" required /></label></div><div className="giver-details"><label>Your Name<input name="name" required autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label></div><p className="giving-note">We do not collect card information on this page. Your gift will be completed through the ministry’s secure giving provider once connected.</p><button className="primary" disabled={status === "sending"} type="submit">{status === "sending" ? "Preparing…" : givingUrl ? "Continue to Secure Giving" : "Record My Commitment"}</button>{status === "error" && <p className="form-error">We couldn’t prepare your gift just now. Please try again.</p>}</form>;
}

function Support() {
  return <main className="page support-page"><section className="support-hero"><span className="eyebrow">SUPPORT THE MINISTRY</span><h1>Belief changes a life when someone is willing to carry it into the real world.</h1><p>A story can help a young person recognize themselves. Your support helps make sure the next thing they meet is not another closed door.</p></section><section className="support-why"><span className="eyebrow">WHY WE ARE ASKING</span><div><h2>We are not a church.<br />We are regular people trying to make a difference for young people in our community.</h2><p>We believe faith should move toward people. It should make room. Create access. Introduce a young person to an adult who sees more in them than their present circumstances can prove.</p><p>Every gift is used to fund the mission and expand the calling: stories that restore possibility, mentorship that creates relationship, education that builds confidence, exposure to skilled trades and businesses, and opportunities that give a young person a real next step.</p></div></section><section className="support-callout"><p>You may never meet the young person whose life your gift touches.</p><h2>But they may remember forever that, when they needed evidence, someone they did not know decided they were worth investing in.</h2></section><section className="giving-section"><div className="giving-intro"><span className="eyebrow">GIVE ONCE OR STAY WITH THE WORK</span><h2>Choose the kind of support you can carry.</h2><p>A one-time gift helps meet what is in front of us now. A monthly commitment gives the ministry the steadiness to plan, build relationships, and keep showing up.</p></div><GivingForm /></section><section className="support-prayer"><span className="eyebrow">ANOTHER WAY TO CARRY IT</span><h2>If you cannot give, pray for the young people we have not met yet—and for the courage to recognize the moment when they are placed in front of us.</h2></section></main>;
}

function SubmissionForm({ type }: { type: "story" | "nomination" }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
    try {
      const response = await fetch("/forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  if (status === "sent") return <div className="form-success"><Mark /><h2>Thank you.</h2><p>Your story is safe with us. We’ll read it carefully and reach out if we need anything else.</p></div>;
  return <form name={type === "story" ? "tell-your-story" : "nominate-someone"} onSubmit={submit}><input type="hidden" name="form-name" value={type === "story" ? "tell-your-story" : "nominate-someone"} /><label>Your Name<input name="name" required autoComplete="name" /></label><label>Email<input name="email" type="email" required autoComplete="email" /></label>{type === "nomination" && <label>Who are you nominating?<input name="nominee" required /></label>}<label>{type === "story" ? "Who believed in you—and what did their belief change?" : "What makes their beginning worth hearing?"}<textarea name="story" rows={7} required /></label><label>Phone <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" /></label><label className="consent"><input name="consent" type="checkbox" required /> I understand this submission does not guarantee publication and that the team may contact me about the story.</label><button className="primary" disabled={status === "sending"} type="submit"><Send size={15} /> {status === "sending" ? "Sending…" : "Send Story"}</button>{status === "error" && <p className="form-error">We couldn’t send this just now. Please try again.</p>}</form>;
}

function TellStory() {
  const [mode, setMode] = useState<"story" | "nomination">("story");
  return <main className="page form-page"><section><span className="eyebrow">THE STORY BEFORE THE SUCCESS</span><h1>{mode === "story" ? "Tell us who believed first." : "Whose beginning should we hear?"}</h1><p>We are looking for the moment before the visible outcome—the person who stayed, prayed, carried, opened a door, or believed when there was no proof.</p><div className="form-switch"><button className={mode === "story" ? "active" : ""} onClick={() => setMode("story")}>Tell My Story</button><button className={mode === "nomination" ? "active" : ""} onClick={() => setMode("nomination")}>Nominate Someone</button></div></section><SubmissionForm key={mode} type={mode} /></main>;
}

function Footer({ go }: { go: (view: View) => void }) {
  return <footer><img className="footer-logo" src="/brand/genesis-moment-emblem.png" alt="The Genesis Moment Podcast" /><p>The story before the success.</p><div><button onClick={() => go({ page: "stories" })}>Stories</button><button onClick={() => go({ page: "thoughtcasts" })}>Thoughtcasts</button><button onClick={() => go({ page: "mustard" })}>The Mustard Seed</button><button onClick={() => go({ page: "story" })}>Tell Your Story</button><button onClick={() => go({ page: "support" })}>Support the Ministry</button></div><small>© The Genesis Moment</small></footer>;
}

export default function App() {
  const [view, setView] = useState<View>({ page: "home" });
  const go = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const content = useMemo(() => {
    switch (view.page) {
      case "stories": return <Stories go={go} />;
      case "episode": return <Episode slug={view.slug} go={go} />;
      case "thoughtcasts": return <Thoughtcasts go={go} />;
      case "thoughtcast": return <Thoughtcast slug={view.slug} />;
      case "mustard": return <Mustard go={go} />;
      case "support": return <Support />;
      case "story": return <TellStory />;
      default: return <Home go={go} />;
    }
  }, [view]);
  return <><Header go={go} />{content}<Footer go={go} /></>;
}
