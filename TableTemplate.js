"use strict";
(function () {
    class TableTemplate {
        static fillIn(tId, dict, NameCol) {
            const table = document.getElementById(tId);

            const headerRow = table.rows[0];
            const isPartNumberTable = NameCol === 'Part Number' && tId === 'table1';

            // eslint-disable-next-line array-callback-return
            Array.from(headerRow.cells).map(cell => {
                const columnHeader = cell.textContent.trim();
                // eslint-disable-next-line max-len
                cell.textContent = this.fillCellTemplate(columnHeader, dict, columnHeader, isPartNumberTable);
            });
            // eslint-disable-next-line max-len
            const columnIndex = NameCol ? Array.from(headerRow.cells).findIndex(cell => cell.textContent.trim() === NameCol) : -1;

            for (let i = 1; i < table.rows.length; i++) {
                const row = table.rows[i];

                if (columnIndex !== -1) {
                    const cell = row.cells[columnIndex];
                    // eslint-disable-next-line max-len
                    cell.textContent = this.fillCellTemplate(cell.textContent, dict, NameCol, false);
                } else {
                    Array.from(row.cells).forEach((cell, j) => {
                        const currentNameCol = headerRow.cells[j].textContent.trim();
                        // eslint-disable-next-line max-len
                        cell.textContent = this.fillCellTemplate(cell.textContent, dict, currentNameCol, isPartNumberTable);
                    });

                }
            }

            table.style.visibility = "visible";
        }

        static fillCellTemplate(cellContent, dict, NameCol, isPartNumberTable) {
            const regex = /{{(.*?)}}/g;

            return cellContent.replace(regex, (match, property) => {
                // eslint-disable-next-line no-nested-ternary
                const replacement = isPartNumberTable && NameCol === 'Part Number' && property.startsWith('n')
                    ? `{{${property}}}`
                    // eslint-disable-next-line no-prototype-builtins
                    : dict.hasOwnProperty(property)
                        ? dict[property]
                        : `{{${property}}}`;

                return replacement;

            });
        }
    }

    window.TableTemplate = TableTemplate;
}());
