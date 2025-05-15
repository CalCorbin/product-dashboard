/**
 * @jest-environment jsdom
 */

import React from 'react';
import { jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useGetAllProducts from './useGetAllProducts';

const mockProducts = [
  {
    id: 'BBS001',
    name: 'Lycos Corn Flakes',
    price: '5.25',
    totalreviews: '40',
    Rating: '5.0',
  },
  {
    id: 'BBS002',
    name: 'Locos Energy Bar',
    price: '2.30',
    totalreviews: '35',
    Rating: '3.25',
  },
  {
    id: 'BBS003',
    name: 'Jim Jam Magic Wand',
    price: '25.00',
    totalreviews: '20',
    Rating: '4.5',
  },
];

global.fetch = jest.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function TestQueryClientProviderWrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe('useGetAllProducts hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches products with no parameters', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const { result } = renderHook(() => useGetAllProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify data was returned correctly
    expect(result.current.data).toEqual(mockProducts);

    // Verify fetch was called once with the correct URL
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/products');
  });

  it('fetches products with bestRated parameter', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    // Render the hook with bestRated option
    const { result } = renderHook(
      () => useGetAllProducts({ bestRated: true }),
      {
        wrapper: createWrapper(),
      }
    );

    // Wait for the query to complete
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify data was returned correctly
    expect(result.current.data).toEqual(mockProducts);

    // Verify fetch was called once with the correct URL
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/products?bestRated=true');
  });

  it('fetches products with multiple query parameters', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts.slice(0, 2)), // Simulating limit: 2
    });

    const { result } = renderHook(
      () => useGetAllProducts({ mostReviewed: true, limit: 2 }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Verify data was returned correctly
    expect(result.current.data).toEqual(mockProducts.slice(0, 2));

    // Verify fetch was called once with the correct URL including both parameters
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      '/api/products?mostReviewed=true&limit=2'
    );
  });

  it('handles error responses from the API', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => useGetAllProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // Verify error is captured
    expect(result.current.error).toBeDefined();
    expect(result.current.error.message).toBe('Failed to fetch products');
  });
});
