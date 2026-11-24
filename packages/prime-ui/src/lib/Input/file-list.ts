// A native file input takes a `FileList`, which has no constructor, so a `DataTransfer` builds one.
export const toFileList = (files: File[]): FileList => {
	const transfer = new DataTransfer();
	for (const file of files) {
		transfer.items.add(file);
	}
	return transfer.files;
};

export const holdsFiles = (list: FileList | null, files: File[]): boolean =>
	list?.length === files.length && files.every((file, index) => list.item(index) === file);
