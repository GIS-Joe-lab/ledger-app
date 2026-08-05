import React from 'react';
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  subscribeLedger,
  saveLedgerPatch,
} from './firebase.js';
import LedgerApp from './LedgerApp.jsx';

export default class AuthGate extends React.Component {
  state = {
    user: undefined, // undefined = still checking, null = signed out, object = signed in
    mode: 'signin',
    email: '',
    password: '',
    error: '',
  };

  unsubAuth = null;
  unsubLedger = null;

  componentDidMount() {
    this.unsubAuth = onAuthStateChanged(auth, (user) => {
      if (this.unsubLedger) { this.unsubLedger(); this.unsubLedger = null; }
      this.setState({ user: user || null });
    });
  }

  componentWillUnmount() {
    if (this.unsubAuth) this.unsubAuth();
    if (this.unsubLedger) this.unsubLedger();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: '' });
    try {
      if (this.state.mode === 'signin') {
        await signInWithEmailAndPassword(auth, this.state.email, this.state.password);
      } else {
        await createUserWithEmailAndPassword(auth, this.state.email, this.state.password);
      }
    } catch (err) {
      this.setState({ error: String(err.message || err).replace('Firebase: ', '') });
    }
  };

  toggleMode = () => {
    this.setState((s) => ({ mode: s.mode === 'signin' ? 'signup' : 'signin', error: '' }));
  };

  // Passed to LedgerApp as `cloud` — same write-through + subscribe shape
  // the original standalone version used, just backed by real state here.
  makeCloud(uid) {
    return {
      onChange: (cb) => {
        if (this.unsubLedger) this.unsubLedger();
        this.unsubLedger = subscribeLedger(uid, cb, (err) => console.error('[Ledger] sync error:', err));
      },
      saveEntries: (entries) => {
        saveLedgerPatch(uid, { entries }).catch((err) => console.error('[Ledger] save failed:', err));
      },
      saveBanks: (bankAccounts) => {
        saveLedgerPatch(uid, { bankAccounts }).catch((err) => console.error('[Ledger] save failed:', err));
      },
    };
  }

  render() {
    const { user, mode, email, password, error } = this.state;

    if (user === undefined) {
      return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text)' }}>Loading…</div>;
    }

    if (!user) {
      return (
        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
          <form onSubmit={this.handleSubmit} className="dialog auth-card">
            <div className="dialog-title">Sign in to Ledger</div>
            <div className="text-muted" style={{ fontSize: 13, marginTop: -8 }}>Syncs your entries across your devices.</div>
            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                className="input"
                type="password"
                required
                minLength={6}
                autoComplete="current-password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="6+ characters"
              />
            </div>
            {error && <div style={{ fontSize: 12.5, color: 'oklch(58% 0.22 25)' }}>{error}</div>}
            <button type="submit" className="btn btn-primary btn-block">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
            <button type="button" className="btn btn-secondary btn-block" onClick={this.toggleMode}>
              {mode === 'signin' ? 'Create account instead' : 'Sign in instead'}
            </button>
          </form>
        </div>
      );
    }

    return <LedgerApp cloud={this.makeCloud(user.uid)} onSignOut={() => signOut(auth)} />;
  }
}
