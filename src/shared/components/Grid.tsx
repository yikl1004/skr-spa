import { createPortal } from 'react-dom'
import styled from 'styled-components'
import DataGrid, {
	SelectColumn,
	TextEditor,
	SelectCellFormatter,
} from 'react-data-grid'
import type { Column, SortColumn } from 'react-data-grid'
import {
	exportToCsv,
	exportToXlsx,
	exportToPdf,
	createRows,
	dateFormatter,
	currencyFormatter,
	getComparator,
} from '@lib/utils/grid'
import type { Row } from '@lib/utils/grid'
import React from 'react'

const Toolbar = styled.div`
	text-align: right;
	margin-bottom: 8px;
`
const DialogContainer = styled.div`
	position: absolute;
	inset: 0;
	display: flex;
	place-items: center;
	background: rgba(0, 0, 0, 0.1);
	> dialog {
		width: 300px;
		> input {
			width: 100%;
		}
		> menu {
			text-align: right;
		}
	}
`
const SelectForTextEditor = styled.select`
	appearance: none;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 0px 6px 0 6px;
	border: 2px solid #ccc;
	vertical-align: top;
	color: var(--rdg-color);
	background-color: var(--rdg-background-color);
	font-family: inherit;
	font-size: var(--rdg-font-size);
	&:focus {
		border-color: var(--rdg-selection-color);
		outline: none;
	}
	&::placeholder {
		color: #999;
		opacity: 1;
	}
`

interface SummaryRow {
	id: string
	totalCount: number
	yesCount: number
}

function getColumns(countries: string[]): readonly Column<Row, SummaryRow>[] {
	return [
		SelectColumn,
		{
			key: 'id',
			name: 'ID',
			width: 60,
			frozen: true,
			resizable: false,
			summaryFormatter() {
				return <strong>Total</strong>
			},
		},
		{
			key: 'title',
			name: 'Task',
			width: 120,
			frozen: true,
			editor: TextEditor,
			summaryFormatter({ row }) {
				return <>{row.totalCount} records</>
			},
		},
		{
			key: 'client',
			name: 'Client',
			width: 220,
			editor: TextEditor,
		},
		{
			key: 'area',
			name: 'Area',
			width: 120,
			editor: TextEditor,
		},
		{
			key: 'country',
			name: 'Country',
			width: 180,
			editor: (p) => (
				<SelectForTextEditor
					autoFocus
					value={p.row.country}
					onChange={(e) =>
						p.onRowChange(
							{ ...p.row, country: e.target.value },
							true,
						)
					}>
					{countries.map((country) => (
						<option key={country}>{country}</option>
					))}
				</SelectForTextEditor>
			),
			editorOptions: {
				editOnClick: true,
			},
		},
		{
			key: 'contact',
			name: 'Contact',
			width: 160,
			editor: TextEditor,
		},
		{
			key: 'assignee',
			name: 'Assignee',
			width: 150,
			editor: TextEditor,
		},
		{
			key: 'progress',
			name: 'Completion',
			width: 110,
			formatter(props) {
				const value = props.row.progress
				return (
					<>
						<progress
							max={100}
							value={value}
							style={{ width: 50 }}
						/>{' '}
						{Math.round(value)}%
					</>
				)
			},
			editor({ row, onRowChange, onClose }) {
				return createPortal(
					<DialogContainer
						onKeyDown={(event) => {
							if (event.key === 'Escape') {
								onClose()
							}
						}}>
						<dialog open>
							<input
								autoFocus
								type="range"
								min="0"
								max="100"
								value={row.progress}
								onChange={(e) =>
									onRowChange({
										...row,
										progress: e.target.valueAsNumber,
									})
								}
							/>
							<menu>
								<button onClick={() => onClose()}>
									Cancel
								</button>
								<button onClick={() => onClose(true)}>
									Save
								</button>
							</menu>
						</dialog>
					</DialogContainer>,
					document.body,
				)
			},
			editorOptions: {
				renderFormatter: true,
			},
		},
		{
			key: 'startTimestamp',
			name: 'Start date',
			width: 100,
			formatter(props) {
				return (
					<TimestampFormatter timestamp={props.row.startTimestamp} />
				)
			},
		},
		{
			key: 'endTimestamp',
			name: 'Deadline',
			width: 100,
			formatter(props) {
				return <TimestampFormatter timestamp={props.row.endTimestamp} />
			},
		},
		{
			key: 'budget',
			name: 'Budget',
			width: 100,
			formatter(props) {
				return <CurrencyFormatter value={props.row.budget} />
			},
		},
		{
			key: 'transaction',
			name: 'Transaction type',
		},
		{
			key: 'account',
			name: 'Account',
			width: 150,
		},
		{
			key: 'version',
			name: 'Version',
			editor: TextEditor,
		},
		{
			key: 'available',
			name: 'Available',
			width: 80,
			formatter({ row, onRowChange, isCellSelected }) {
				return (
					<SelectCellFormatter
						value={row.available}
						onChange={() => {
							onRowChange({ ...row, available: !row.available })
						}}
						onClick={(event) => event.stopPropagation()}
						isCellSelected={isCellSelected}
					/>
				)
			},
			summaryFormatter({ row: { yesCount, totalCount } }) {
				return <>{`${Math.floor((100 * yesCount) / totalCount)}% ✔️`}</>
			},
		},
	]
}

const TimestampFormatter: React.FC<{ timestamp: number }> = ({ timestamp }) => {
	return <>{dateFormatter.format(timestamp)}</>
}

const CurrencyFormatter: React.FC<{ value: number }> = ({ value }) => {
	return <>{currencyFormatter.format(value)}</>
}

function rowKeyGetter(row: Row) {
	return row.id
}

const ExportButton: React.FC<{
	onExport: () => Promise<unknown>
	children: React.ReactChild
}> = ({ onExport, children }) => {
	const [exporting, setExporting] = React.useState(false)
	return (
		<button
			disabled={exporting}
			onClick={async () => {
				setExporting(true)
				await onExport()
				setExporting(false)
			}}>
			{exporting ? 'Exporting' : children}
		</button>
	)
}

export default function CommonFeatures() {
	const [rows, setRows] = React.useState(createRows)
	const [sortColumns, setSortColumns] = React.useState<readonly SortColumn[]>(
		[],
	)
	const [selectedRows, setSelectedRows] = React.useState<ReadonlySet<number>>(
		() => new Set(),
	)

	const countries = React.useMemo(() => {
		return [...rows.map((r) => r.country)].sort(new Intl.Collator().compare)
	}, [])
	const columns = React.useMemo(() => getColumns(countries), [countries])

	const summaryRows = React.useMemo(() => {
		const summaryRow: SummaryRow = {
			id: 'total_0',
			totalCount: rows.length,
			yesCount: rows.filter((r) => r.available).length,
		}
		return [summaryRow]
	}, [rows])

	const sortedRows = React.useMemo((): readonly Row[] => {
		if (sortColumns.length === 0) return rows

		const sortedRows = [...rows]
		sortedRows.sort((a, b) => {
			for (const sort of sortColumns) {
				const comparator = getComparator(sort.columnKey)
				const compResult = comparator(a, b)
				if (compResult !== 0) {
					return sort.direction === 'ASC' ? compResult : -compResult
				}
			}
			return 0
		})
		return sortedRows
	}, [rows, sortColumns])

	const gridElement = (
		<DataGrid
			rowKeyGetter={rowKeyGetter}
			columns={columns}
			rows={sortedRows}
			defaultColumnOptions={{
				sortable: true,
				resizable: true,
			}}
			selectedRows={selectedRows}
			onSelectedRowsChange={setSelectedRows}
			onRowsChange={setRows}
			sortColumns={sortColumns}
			onSortColumnsChange={setSortColumns}
			summaryRows={summaryRows}
			className="fill-grid"
		/>
	)

	return (
		<>
			<Toolbar>
				<ExportButton
					onExport={() =>
						exportToCsv(gridElement, 'CommonFeatures.csv')
					}>
					Export to CSV
				</ExportButton>
				<ExportButton
					onExport={() =>
						exportToXlsx(gridElement, 'CommonFeatures.xlsx')
					}>
					Export to XSLX
				</ExportButton>
				<ExportButton
					onExport={() =>
						exportToPdf(gridElement, 'CommonFeatures.pdf')
					}>
					Export to PDF
				</ExportButton>
			</Toolbar>
			{gridElement}
		</>
	)
}
