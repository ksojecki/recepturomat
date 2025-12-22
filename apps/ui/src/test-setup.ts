/**
 * Jest setup file for global test utilities.
 * This file runs before each test suite and configures the test environment.
 */

import { TextEncoder, TextDecoder as NodeTextDecoder } from 'util';
import '@testing-library/jest-dom';

// Setup TextEncoder/TextDecoder for Jest environment
global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as typeof TextDecoder; // necessary because there is a mismatch between ts type and node type
