import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, ExternalLink } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import SectionWrapper from './SectionWrapper';
import SectionHeading from './SectionHeading';

const USERNAME = 'j-pravalika';

export default function GitHubDashboard() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        if (!profileRes.ok) throw new Error('GitHub API error');
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        setProfile(profileData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute language stats
  const langCounts = {};
  repos.forEach(r => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
  const topLangs = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([lang, count]) => ({ lang, count }));

  const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const topRepos = [...repos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, 4);

  const stats = [
    { label: 'Repositories', value: profile?.public_repos ?? '—', icon: BookOpen, color: 'primary' },
    { label: 'Followers', value: profile?.followers ?? '—', icon: Github, color: 'accent' },
    { label: 'Total Stars', value: totalStars, icon: Star, color: 'primary' },
    { label: 'Following', value: profile?.following ?? '—', icon: GitFork, color: 'accent' },
  ];

  return (
    <SectionWrapper id="github">
      <SectionHeading
        label="// GitHub"
        title="Open Source Activity"
        subtitle="Real-time stats from GitHub — contributions, repositories, and language expertise."
      />

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-muted-foreground">
          <Github className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>Could not load GitHub data. Visit <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{USERNAME}</a> directly.</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-8">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="glass rounded-xl p-4 text-center group hover:glow-cyan transition-all duration-300"
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                <div className={`font-heading text-2xl font-bold ${stat.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Repos */}
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Top Repositories</h3>
              <div className="space-y-3">
                {topRepos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-3 glass rounded-xl hover:glow-cyan transition-all duration-300 group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono font-medium text-foreground group-hover:text-primary truncate transition-colors">
                        {repo.name}
                      </p>
                      {repo.language && (
                        <span className="text-xs text-muted-foreground">{repo.language}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 ml-3">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3" />{repo.stargazers_count}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Language Radar */}
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Language Distribution</h3>
              {topLangs.length > 0 ? (
                <div className="glass rounded-xl p-4 h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={topLangs.map(l => ({ subject: l.lang, value: l.count }))}>
                      <PolarGrid stroke="rgba(0,245,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                      <Radar dataKey="value" stroke="#00F5FF" fill="#00F5FF" fillOpacity={0.15} strokeWidth={2} />
                      <Tooltip
                        contentStyle={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(0,245,255,0.2)', borderRadius: '8px', fontSize: 12 }}
                        labelStyle={{ color: '#00F5FF' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="glass rounded-xl p-4 h-60 flex items-center justify-center text-muted-foreground text-sm">
                  No language data available
                </div>
              )}
            </div>
          </div>

          {/* GitHub Link */}
          <div className="text-center">
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-primary border border-primary/20 hover:bg-primary/10 transition-all duration-300 font-mono text-sm"
            >
              <Github className="w-4 h-4" />
              View Full Profile on GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}