import test from 'ava'

const mockFs = require('mock-fs')
const _runSubdir = require('../src/index')

const runSubdir = (dir, command, execFunction) => {
	return _runSubdir(dir, command, execFunction)
}

test.afterEach(x => {
	mockFs.restore();
})

test(`run 'git status' in all subdirectories`, async t => {
	t.plan(7)
	mockFs({
		'grandparent': {
		  'parent': {
		    'some-file.txt': '',
		    'dir1': {},
		    'dir2': {},
		    'dir3': {},
		  	'image.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
		  },
		},
	});

	let expectedDirectories = [
		'grandparent/parent/dir1',
		'grandparent/parent/dir2',
		'grandparent/parent/dir3',
	];

	let calledDirectories = []

	await new Promise ((resolve, reject) => {
		runSubdir('grandparent/parent', 'git status', (cmd, options, callback) => {
			t.is('git status', cmd)
			calledDirectories.push(options.cwd)
			callback()
		})

		setTimeout(resolve, 1000)
	})

	await new Promise ((resolve, reject) => {
		t.is(expectedDirectories.length, calledDirectories.length)

		expectedDirectories.map(expectedDirectory => {
			t.is(expectedDirectory, calledDirectories.find(dir => dir === expectedDirectory))
		})

		resolve()
	})
})
