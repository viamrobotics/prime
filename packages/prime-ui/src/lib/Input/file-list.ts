/** Builds the `FileList` a native file input takes, which has no constructor of its own. */
export const toFileList = (files: File[]): FileList => {
	const transfer = new DataTransfer();
	for (const file of files) {
		transfer.items.add(file);
	}
	return transfer.files;
};

/** Whether a native input's `files` already holds exactly these files, in this order. */
export const holdsFiles = (list: FileList | null, files: File[]): boolean =>
	list?.length === files.length && files.every((file, index) => list.item(index) === file);
