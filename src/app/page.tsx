'use client';

import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ImageList from '../components/ImageList';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <header style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </header>
      <main style={{ padding: '1rem' }}>
        <ImageList searchTerm={searchTerm} />
      </main>
    </div>
  );
}
