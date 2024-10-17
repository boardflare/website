import React, { useEffect } from 'react';

export function Gradio({ notebookPath }) {
  useEffect(() => {
    async function fetchNotebook() {
      try {
        const baseUrl = 'https://addins.boardflare.com/python/preview/notebooks/';
        const response = await fetch(baseUrl + notebookPath);
        const notebook = await response.json();

        let requirements = '';
        let functionCode = '';
        let appCode = '';

        notebook.cells.forEach(cell => {
          if (cell.cell_type === 'raw') {
            const tags = cell.metadata.tags || [];
            if (tags.includes('requirements')) {
              requirements = cell.source.join('');
            }
          } else if (cell.cell_type === 'code') {
            const tags = cell.metadata.tags || [];
            if (tags.includes('function')) {
              functionCode = cell.source.join('');
            }
            if (tags.includes('gradio')) {
              appCode = cell.source.join('');
            }
          }
        });

        console.log('requirements:', requirements);
        console.log('functionCode:', functionCode);
        console.log('appCode:', appCode);

        const gradioHTML = `
          <gradio-lite shared-worker>

            <gradio-requirements>
              ${requirements}
            </gradio-requirements>

            <gradio-file name="app.py" entrypoint>
            ${appCode}
            </gradio-file>

            <gradio-file name="function.py" >
            ${functionCode}
            </gradio-file>
      
          </gradio-lite>
        `;
        const container = document.getElementById('gradio-container');
        container.innerHTML = gradioHTML;
      } catch (error) {
        console.error('Error fetching notebook:', error);
      }
    }

    fetchNotebook();
  }, [notebookPath]);

  return (
    <div id="gradio-container">
      {/* Gradio Lite app will be injected here */}
    </div>
  );
}