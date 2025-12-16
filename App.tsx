import React, { useState, useEffect } from 'react';
import { Document } from './components/Document';
import { parseStudentData } from './utils';
import { Student } from './types';
import { Printer, ArrowLeft, FileText, CheckCircle, Eraser } from 'lucide-react';

const INITIAL_PLACEHOLDER = `20241134010037  Nivaldo Tauã Silva da Cruz
20241134010023  Isly Gabriely Galvão dos Santos`;

type AppMode = 'input' | 'preview';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('input');
  const [inputText, setInputText] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);

  // Parse data logic
  useEffect(() => {
    const parsed = parseStudentData(inputText);
    if (parsed.length === 0) {
      setStudents([{ id: '', name: '' }]);
    } else {
      setStudents(parsed);
    }
  }, [inputText]);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      if (!window.confirm("A lista está vazia. Deseja gerar um documento em branco?")) {
        return;
      }
    }
    setMode('preview');
    window.scrollTo(0, 0);
  };

  const handleBackToEdit = () => {
    setMode('input');
  };

  const handlePrint = () => {
    window.print();
  };

  const loadExample = () => {
    setInputText(INITIAL_PLACEHOLDER);
  };

  const handleClear = () => {
    if (window.confirm('Deseja limpar todos os dados inseridos?')) {
      setInputText('');
    }
  };

  // --- VIEW 1: INPUT SCREEN ---
  if (mode === 'input') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-3xl w-full rounded-xl shadow-lg overflow-hidden border border-gray-200">
          
          {/* Header */}
          <div className="bg-blue-600 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Nova Autorização de Entrada
            </h1>
            <p className="text-blue-100 mt-1 opacity-90">
              Cole a lista de alunos abaixo para gerar a folha de assinatura.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Lista de Alunos (Matrícula + Nome)
              </label>
              <div className="relative">
                <textarea
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none bg-gray-50 transition-all"
                  placeholder="Exemplo:&#10;20241134010037  Nivaldo Tauã Silva da Cruz&#10;20241134010023  Isly Gabriely Galvão dos Santos"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={handleClear}
                    className="text-xs flex items-center gap-1 text-gray-400 hover:text-red-500 bg-white px-2 py-1 rounded shadow-sm border border-gray-200 transition-colors"
                    title="Limpar tudo"
                  >
                    <Eraser className="w-3 h-3" /> Limpar
                  </button>
                  <button 
                    onClick={loadExample}
                    className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-white px-2 py-1 rounded shadow-sm border border-gray-200 transition-colors"
                  >
                    Exemplo
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Dica: Você pode copiar diretamente do Excel e colar aqui. O sistema reconhece tabulações e vírgulas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                {students.length > 0 && students[0].id !== '' 
                  ? `${students.length} aluno(s) identificado(s)` 
                  : 'Nenhum aluno identificado'}
              </div>
              <button
                onClick={handleGenerate}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Gerar Documento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: PREVIEW SCREEN (Document) ---
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center print:bg-white print:block">
      
      {/* Toolbar (Hidden on Print) */}
      <div className="w-full bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50 print:hidden">
        <div className="max-w-[210mm] mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={handleBackToEdit}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar e Editar
          </button>

          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-500 hidden sm:inline">
               Verifique os dados antes de imprimir
             </span>
             <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors"
            >
              <Printer className="w-5 h-5" />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-grow p-8 print:p-0 w-full flex justify-center overflow-auto">
        <div className="print:w-full">
          <Document students={students} />
        </div>
      </div>

    </div>
  );
};

export default App;