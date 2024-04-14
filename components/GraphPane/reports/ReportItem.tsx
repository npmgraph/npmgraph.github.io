import React from 'react';

import { cn } from '../../../lib/dom.js';
import { RenderedAnalysis } from './Analyzer.js';
import styles from './ReportItem.module.scss';

const SYMBOLS = {
  info: null,
  warn: '\u{26a0}',
  error: '\u{1f6ab}',
};

export function ReportItem<T>({
  state,
  renderer,
  children,
  ...props
}: {
  state?: T;
  renderer: (state: T) => RenderedAnalysis;
  type?: 'info' | 'warn' | 'error';
} & React.HTMLAttributes<HTMLDetailsElement>) {
  if (!state) return null;

  const rendered = renderer(state);
  if (!rendered) return null;

  const { type, summary, details } = rendered;

  return (
    <details className={cn(styles.root, styles[type])} {...props}>
      <summary className="bright-hover">
        <span className={styles.symbol}>{SYMBOLS[type]}</span>
        {summary}
      </summary>
      {children ? <div className={styles.description}>{children}</div> : null}
      <div className={styles.body}>{details}</div>
    </details>
  );
}
