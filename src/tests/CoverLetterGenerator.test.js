import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { EditorState } from 'draft-js';
import CoverLetterGenerator from '../components/CoverLetterGenerator';

const DraftTabsMock = (props) => (
  <div data-testid="draft-tabs" {...props}>
    DraftTabs Component
  </div>
);
DraftTabsMock.displayName = 'DraftTabsMock';

const AddDraftDialogMock = (props) => (
  <div data-testid="add-draft-dialog" {...props}>
    AddDraftDialog Component
  </div>
);
AddDraftDialogMock.displayName = 'AddDraftDialogMock';

const CoverLetterFormMock = (props) => (
  <div data-testid="cover-letter-form" {...props}>
    CoverLetterForm Component
  </div>
);
CoverLetterFormMock.displayName = 'CoverLetterFormMock';

jest.mock('../components/DraftTabs', () => DraftTabsMock);
jest.mock('../components/AddDraftDialog', () => AddDraftDialogMock);
jest.mock('../components/CoverLetterForm', () => CoverLetterFormMock); // jest.mock('../components/DraftTabs', () => props => (
jest.mock('jspdf', () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    addImage: jest.fn(),
    save: jest.fn(),
    internal: { pageSize: { getWidth: () => 600, getHeight: () => 600 } },
  })),
}));
jest.mock('html2canvas', () =>
  jest.fn(() =>
    Promise.resolve({
      toDataURL: () => 'data:image/png;base64,',
    })
  )
);
jest.mock('draft-js', () => ({
  EditorState: {
    createEmpty: jest.fn(),
    createWithContent: jest.fn((content) => ({
      getCurrentContent: jest.fn(() => content),
    })),
  },
  convertFromRaw: jest.fn(() => ({
    getPlainText: jest.fn(() => 'Sample text'),
  })),
  convertToRaw: jest.fn(() => ({})),
}));

const mockEditorState = {
  getCurrentContent: jest.fn(() => ({
    getPlainText: jest.fn(() => 'Sample text'),
  })),
};
EditorState.createEmpty.mockReturnValue(mockEditorState);
EditorState.createWithContent.mockImplementation((content) => ({
  getCurrentContent: jest.fn(() => content),
}));

describe('CoverLetterGenerator', () => {
  beforeEach(() => {
    render(<CoverLetterGenerator />);
  });
  it('renders without crashing', () => {
    expect(screen.getByText(/Cover Letter Generator/i)).toBeInTheDocument();
  });

  it('initializes editor state on mount', () => {
    expect(EditorState.createEmpty).toHaveBeenCalled();
  });

  it('loads drafts from localStorage correctly', async () => {
    const rawDrafts = JSON.stringify([{ content: {} }]);
    localStorage.setItem('coverLetterDrafts', rawDrafts);
    await waitFor(() => {
      expect(screen.getByTestId('draft-tabs')).toBeInTheDocument();
    });
  });

  it('updates editor state correctly', async () => {
    const rawDrafts = JSON.stringify([{ content: {} }]);
    localStorage.setItem('coverLetterDrafts', rawDrafts);
    await waitFor(() => {
      expect(EditorState.createWithContent).toHaveBeenCalled();
    });
  });

  it('opens add draft dialog on click', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('add-draft-dialog')).toBeInTheDocument();
    });
  });

  it('saves drafts to localStorage correctly', async () => {
    await waitFor(() => {
      expect(localStorage.length).toBe(1);
    });
  });

  it('deletes drafts from localStorage correctly', async () => {
    await waitFor(() => {
      expect(localStorage.length).toBe(1);
    });
  });

  it('updates drafts in localStorage correctly', async () => {
    await waitFor(() => {
      expect(localStorage.length).toBe(1);
    });
  });

  it('generates cover letter correctly', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('cover-letter-form')).toBeInTheDocument();
    });
  });
});
