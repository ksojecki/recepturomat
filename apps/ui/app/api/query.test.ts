/**
 * Tests for a query utility function.
 * Tests HTTP request handling, error scenarios, and different HTTP methods.
 */
import { query } from './query';
import { MockedFunction } from 'vitest';

// Mock fetch globally using Vitest
globalThis.fetch = vi.fn();

describe('query', () => {
  // Type the mocked fetch as Vitest Mock to avoid any casts
  const mockFetch = globalThis.fetch as MockedFunction<typeof fetch>;
  const API_URL = 'https://localhost:3333/api';

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET requests', () => {
    it('should make a GET request without authentication', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      const result = await query<{ data: string }>({
        endpoint: 'recipes',
        method: 'GET',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/recipes`,
        expect.objectContaining({
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should make a GET request with authentication token', async () => {
      const mockResponse = { data: 'authenticated' };
      const apiToken = 'test-token-123';

      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      await query<{ data: string }>({
        endpoint: 'recipes',
        method: 'GET',
        apiToken,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/recipes`,
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Headers),
        })
      );

      // Check if the Authorization header was set
      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers as Headers;
      expect(headers.get('Authorization')).toBe(`Bearer ${apiToken}`);
    });

    it('should construct correct endpoint URL', async () => {
      const mockResponse = { id: 1 };
      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      await query<{ id: number }>({
        endpoint: 'recipes/123',
        method: 'GET',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/recipes/123`,
        expect.any(Object)
      );
    });
  });

  describe('POST requests', () => {
    it('should make a POST request with body', async () => {
      const mockResponse = { success: true };
      const requestBody = { name: 'New Recipe', ingredients: [] };

      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      const result = await query<{ success: boolean }, typeof requestBody>({
        endpoint: 'recipes',
        method: 'POST',
        body: requestBody,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/recipes`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should include Content-Type header for POST requests', async () => {
      const mockResponse = { id: 1 };
      const requestBody = { data: 'test' };

      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      await query<{ id: number }, typeof requestBody>({
        endpoint: 'recipes',
        method: 'POST',
        body: requestBody,
      });

      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers as Headers;
      expect(headers.get('Content-Type')).toBe('application/json');
    });

    it('should make a POST request with authentication token', async () => {
      const mockResponse = { created: true };
      const apiToken = 'auth-token-456';
      const requestBody = { title: 'Test' };

      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      await query<{ created: boolean }, typeof requestBody>({
        endpoint: 'recipes',
        method: 'POST',
        body: requestBody,
        apiToken,
      });

      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers as Headers;
      expect(headers.get('Authorization')).toBe(`Bearer ${apiToken}`);
      expect(headers.get('Content-Type')).toBe('application/json');
    });
  });

  describe('DELETE requests', () => {
    it('should make a DELETE request', async () => {
      const mockResponse = { deleted: true };

      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      const result = await query<{ deleted: boolean }>({
        endpoint: 'recipes/123',
        method: 'DELETE',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_URL}/recipes/123`,
        expect.objectContaining({
          method: 'DELETE',
          body: undefined,
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should make a DELETE request with authentication', async () => {
      const mockResponse = { success: true };
      const apiToken = 'delete-token-789';

      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      await query<{ success: boolean }>({
        endpoint: 'recipes/456',
        method: 'DELETE',
        apiToken,
      });

      const callArgs = mockFetch.mock.calls[0];
      const headers = callArgs[1]?.headers as Headers;
      expect(headers.get('Authorization')).toBe(`Bearer ${apiToken}`);
    });
  });

  describe('error handling', () => {
    it('should handle network errors', async () => {
      const networkError = new Error('Network failure');
      mockFetch.mockRejectedValueOnce(networkError);

      // Mock console.error to avoid noise in test output
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      await expect(
        query<{ data: string }>({
          endpoint: 'recipes',
          method: 'GET',
        })
      ).rejects.toThrow('Network failure');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching data:',
        networkError
      );

      consoleErrorSpy.mockRestore();
    });

    it('should handle fetch errors and log them', async () => {
      const fetchError = new Error('Failed to fetch');
      mockFetch.mockRejectedValueOnce(fetchError);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      await expect(
        query<{ data: string }>({
          endpoint: 'invalid',
          method: 'GET',
        })
      ).rejects.toThrow('Failed to fetch');

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('should handle JSON parsing errors', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => {
          throw new Error('Invalid JSON');
        },
      } as unknown as Response);

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      await expect(
        query<{ data: string }>({
          endpoint: 'recipes',
          method: 'GET',
        })
      ).rejects.toThrow('Invalid JSON');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('request options', () => {
    it('should always include CORS mode', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      await query<{ data: string }>({
        endpoint: 'test',
        method: 'GET',
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1]?.mode).toBe('cors');
    });


    it('should set redirect to follow', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      await query<{ data: string }>({
        endpoint: 'test',
        method: 'GET',
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1]?.redirect).toBe('follow');
    });

    it('should set referrerPolicy to no-referrer', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      await query<{ data: string }>({
        endpoint: 'recipes',
        method: 'GET',
      });

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1]?.referrerPolicy).toBe('no-referrer');
    });
  });

  describe('type safety', () => {
    it('should return correctly typed response', async () => {
      interface Recipe {
        id: string;
        name: string;
        ingredients: string[];
      }

      const mockRecipe: Recipe = {
        id: '123',
        name: 'Test Recipe',
        ingredients: ['flour', 'sugar'],
      };

      mockFetch.mockResolvedValueOnce({
        json: async () => mockRecipe,
      } as Response);

      const result = await query<Recipe>({
        endpoint: 'recipes/123',
        method: 'GET',
      });

      // TypeScript should infer the correct type
      expect(result.id).toBe('123');
      expect(result.name).toBe('Test Recipe');
      expect(result.ingredients).toHaveLength(2);
    });

    it('should handle POST with typed request body', async () => {
      interface CreateRecipeRequest {
        name: string;
        weight: number;
      }

      interface CreateRecipeResponse {
        id: string;
        success: boolean;
      }

      const requestBody: CreateRecipeRequest = {
        name: 'New Recipe',
        weight: 500,
      };

      const mockResponse: CreateRecipeResponse = {
        id: 'new-123',
        success: true,
      };

      mockFetch.mockResolvedValueOnce({
        json: async () => mockResponse,
      } as Response);

      const result = await query<CreateRecipeResponse, CreateRecipeRequest>({
        endpoint: 'recipes',
        method: 'POST',
        body: requestBody,
      });

      expect(result.id).toBe('new-123');
      expect(result.success).toBe(true);
    });
  });
});

