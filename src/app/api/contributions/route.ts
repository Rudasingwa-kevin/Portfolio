import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Rudasingwa-kevin";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: GITHUB_USERNAME },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: "Failed to fetch from GitHub", details: errorText }, { status: 500 });
    }

    const data = await res.json();
    
    if (data.errors) {
      return NextResponse.json({ error: "GraphQL error", details: data.errors }, { status: 500 });
    }

    const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
    
    if (!calendar) {
      return NextResponse.json({ error: "Invalid response structure", details: data }, { status: 500 });
    }

    return NextResponse.json(calendar);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch contributions", details: String(err) }, { status: 500 });
  }
}
