import React, { useMemo } from 'react';
import { Student } from '../types';
import { IFRNLogo } from './IFRNLogo';
import { getFormattedDate } from '../utils';

interface DocumentProps {
  students: Student[];
}

// Configuração única: 25 itens por página
const ITEMS_PER_PAGE = 25;

export const Document: React.FC<DocumentProps> = ({ students }) => {
  const formattedDate = useMemo(() => getFormattedDate(), []);

  // Lógica: divide a lista em blocos de 25
  const pages = useMemo(() => {
    const chunks: Student[][] = [];
    // Garante que se não houver alunos, apareça pelo menos uma página
    const list = students.length > 0 ? students : [{ id: '', name: '' }];
    
    for (let i = 0; i < list.length; i += ITEMS_PER_PAGE) {
      chunks.push(list.slice(i, i + ITEMS_PER_PAGE));
    }
    return chunks;
  }, [students]);

  const totalPages = pages.length;

  return (
    <div className="flex flex-col gap-8 print:gap-0 print:block bg-transparent print:m-0 print:p-0">
      {pages.map((pageStudents, pageIndex) => {
        const isFirstPage = pageIndex === 0;
        const isLastPage = pageIndex === pages.length - 1;
        const pageNumber = pageIndex + 1;
        
        const startIndex = pageIndex * ITEMS_PER_PAGE;

        return (
          <div 
            key={pageIndex}
            className="bg-white w-[210mm] h-[295mm] px-[15mm] py-[10mm] mx-auto shadow-xl print:shadow-none print:w-[210mm] print:h-[297mm] print:m-0 print:p-[15mm] relative flex flex-col box-border overflow-hidden"
            style={{ 
              // Força a quebra de página apenas se não for a última
              pageBreakAfter: isLastPage ? 'auto' : 'always',
              breakAfter: isLastPage ? 'auto' : 'page'
            }}
          >
            {/* Header */}
            <div className="flex items-center mb-2 h-[65px]">
              <div className="flex-shrink-0 mr-4">
                <IFRNLogo className="w-[45px] h-[60px]" />
              </div>
              <div className="flex-grow text-sm leading-tight text-black font-normal">
                <p>Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte</p>
                <p className="font-bold">CAMPUS NOVA CRUZ</p>
                <p>Coordenação de Apoio Acadêmico (COAPAC)</p>
              </div>
            </div>

            {/* Conteúdo específico da Primeira Página */}
            {isFirstPage && (
              <>
                <div className="text-center mb-3">
                  <h1 className="text-[16px] font-bold uppercase border-b-2 border-black inline-block pb-1 mb-1">
                    Autorização para Entrada em Sala de Aula
                  </h1>
                  <h2 className="text-[16px] font-bold uppercase">
                    Cadastro em Grupo
                  </h2>
                </div>

                <div className="bg-gray-50 border border-gray-300 p-2 mb-2 text-center text-xs font-bold print:bg-transparent print:border-gray-400">
                  Informo que os alunos listados abaixo compareceram à COAPAC para apresentar suas justificativas, as quais já foram verificadas e devidamente registradas.
                </div>
              </>
            )}

            {/* Cabeçalho de continuação para páginas seguintes */}
            {!isFirstPage && (
              <div className="text-center mb-4">
                <h2 className="text-[14px] font-bold uppercase text-gray-500">
                  (Continuação da Lista)
                </h2>
              </div>
            )}

            {/* Tabela de Alunos */}
            <div className="w-full">
              <table className="w-full border-collapse text-[11px]">
                <thead>
                  <tr className="bg-gray-100 print:bg-gray-100">
                    <th className="border border-black px-2 py-1 w-[8%] text-center uppercase h-6">Nº</th>
                    <th className="border border-black px-2 py-1 w-[25%] text-center uppercase">Matrícula</th>
                    <th className="border border-black px-2 py-1 w-[67%] text-left uppercase">Aluno(a)</th>
                  </tr>
                </thead>
                <tbody>
                  {pageStudents.map((student, i) => (
                    <tr key={i} className="hover:bg-gray-50 print:hover:bg-transparent">
                      <td className="border border-black px-2 py-1 text-center h-6">
                        {student.name || student.id ? startIndex + i + 1 : '-'}
                      </td>
                      <td className="border border-black px-2 py-1 text-center font-mono text-[12px]">
                        {student.id}
                      </td>
                      <td className="border border-black px-2 py-1 text-left uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px]">
                        {student.name || <span className="opacity-0">&nbsp;</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Rodapé fixado embaixo */}
            <div className="mt-auto">
              {isLastPage ? (
                <div className="pt-2">
                  <div className="text-center italic text-sm mb-2">
                    {formattedDate}
                  </div>
                  {/* ESPAÇO AMPLO PARA ASSINATURA */}
                  <div className="flex justify-center mt-20 mb-4">
                    <div className="w-[300px] text-center border-t border-black pt-2 text-sm font-semibold uppercase">
                      Assistente de Alunos
                    </div>
                  </div>
                </div>
              ) : (
                 <div className="h-[20px]"></div>
              )}

              {/* Numeração de Página */}
              <div className="h-[20px] flex items-end justify-end">
                 {totalPages > 1 && (
                    <span className="text-[10px] text-gray-500 print:text-gray-600">
                      Página {pageNumber} de {totalPages}
                    </span>
                 )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};