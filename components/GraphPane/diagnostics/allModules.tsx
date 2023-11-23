import simplur from 'simplur';
import { cn } from '../../../lib/dom.js';
import { Selectable } from '../../Selectable.js';
import { Diagnostic } from './Diagnostic.js';
import styles from './allModules.module.scss';

export const allModules: Diagnostic<never> = {
  map() {},

  reduce({ moduleInfos, entryModules }) {
    const summary = simplur`All modules (${entryModules.size} entr[y|ies],  ${
      moduleInfos.size - entryModules.size
    } dependent[|s])`;

    const details = Array.from(moduleInfos.values())
      .sort((a, b) => a.module.key.localeCompare(b.module.key))
      .map(({ module }) => (
        <div className={cn(styles.row)} key={module.key}>
          <Selectable
            className={cn(styles.name, {
              [styles.entry]: entryModules.has(module),
            })}
            type="exact"
            value={module.key}
          />
        </div>
      ));

    return { summary, details };
  },
};
