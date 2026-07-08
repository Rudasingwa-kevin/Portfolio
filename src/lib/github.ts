const GITHUB_USERNAME = "Rudasingwa-kevin";
const GITHUB_API = "https://api.github.com";

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
  avatar_url: string;
  html_url: string;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  default_branch: string;
  size: number;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: Record<string, unknown>;
  created_at: string;
}

export interface LanguageStats {
  [language: string]: number;
}

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
};

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  return res.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers });
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  return res.json();
}

export async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events?per_page=30`, { headers });
  if (!res.ok) throw new Error("Failed to fetch GitHub events");
  return res.json();
}

export async function fetchLanguageStats(): Promise<LanguageStats> {
  const repos = await fetchGitHubRepos();
  const languages: LanguageStats = {};

  for (const repo of repos) {
    if (repo.language && !repo.fork) {
      languages[repo.language] = (languages[repo.language] || 0) + repo.size;
    }
  }

  return languages;
}

export function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
}

export function formatEvent(event: GitHubEvent): string {
  const repoName = event.repo.name.replace(GITHUB_USERNAME + "/", "");
  switch (event.type) {
    case "PushEvent":
      return `Pushed to ${repoName}`;
    case "CreateEvent":
      return `Created ${(event.payload as { ref_type?: string }).ref_type || "branch"} in ${repoName}`;
    case "DeleteEvent":
      return `Deleted ${(event.payload as { ref_type?: string }).ref_type || "branch"} in ${repoName}`;
    case "IssuesEvent":
      return `${(event.payload as { action?: string }).action || "updated"} issue in ${repoName}`;
    case "PullRequestEvent":
      return `${(event.payload as { action?: string }).action || "updated"} PR in ${repoName}`;
    case "ForkEvent":
      return `Forked ${repoName}`;
    case "StarEvent":
      return `Starred ${repoName}`;
    case "ReleaseEvent":
      return `Released in ${repoName}`;
    default:
      return `Activity in ${repoName}`;
  }
}

export function getEventIcon(type: string): string {
  switch (type) {
    case "PushEvent": return "⬆️";
    case "CreateEvent": return "🆕";
    case "DeleteEvent": return "🗑️";
    case "IssuesEvent": return "🐛";
    case "PullRequestEvent": return "🔀";
    case "ForkEvent": return "🍴";
    case "StarEvent": return "⭐";
    case "ReleaseEvent": return "📦";
    default: return "📌";
  }
}
