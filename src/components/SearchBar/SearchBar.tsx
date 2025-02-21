'use client';

import React from 'react';
import { Search } from 'react-bootstrap-icons';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.searchContainer}>
      <Search className={styles.searchIcon} />
      <input
        type="text"
        placeholder="You're looking for something?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;