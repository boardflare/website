import React, { useEffect } from 'react';

const GradioApp = () => {
  useEffect(() => {
    const gradioHTML = `
      <gradio-lite shared-worker>

        <gradio-requirements>
          textdistance
        </gradio-requirements>

        <gradio-file name="app.py" entrypoint>
        import gradio as gr
        from utils import add

        demo = gr.Interface(fn=add, inputs=["number", "number"], outputs="number")

        demo.launch()
        </gradio-file>

        <gradio-file name="utils.py" >
        def add(a, b):
          return a + b
        </gradio-file>
   
      </gradio-lite>
    `;
    const container = document.getElementById('gradio-container');
    container.innerHTML = gradioHTML;
  }, []);

  return (
    <div id="gradio-container">
      {/* Gradio Lite app will be injected here */}
    </div>
  );
};

export default GradioApp;