'use client';

import { useState } from 'react';
import Image from 'next/image';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageList from '../components/ImageList/ImageList';
import styles from './page.module.css';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer} onClick={handleLogoClick} >
          <Image src="/samyLogo.svg" alt="Samy Logo" width={120} height={120} />
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
      </header>
      <ImageList searchTerm={searchTerm} />
    </div>
  );
}