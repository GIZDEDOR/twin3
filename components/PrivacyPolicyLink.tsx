import styles from './privacy-policy.module.css';

export default function PrivacyPolicyLink({ placement = 'footer' }: { placement?: 'footer' | 'contacts' | 'details' }) {
  return (
    <div className={`${styles.block} ${styles[placement]}`}>
      <div className={styles.content}>
        <p className={styles.label}>ДОКУМЕНТЫ / 01</p>
        <a href="/documents/personal-data-policy.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>
          <span>Политика обработки персональных данных</span>
          <svg className={styles.arrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 19 19 5M5 5h14v14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
