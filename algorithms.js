const getBubbleSortLL = (list) => {
    let head = new Node(null, null);
    let tempNode = head;

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - i - 1; j++) {
            if (list[j] > list[j + 1]) {
                swapEles(list, j, j + 1);
            }
            tempNode.next = new Node(j, j + 1, Array.from(list));
            tempNode = tempNode.next;
        }
    }
    return head.next;
};

const getSelectionSortLL = (arr) => {
    let min_idx;
    n = arr.length

    let head = new Node(null, null);
    let tempNode = head;

    for (let i = 0; i < n - 1; i++) {
        min_idx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
            tempNode.next = new Node(j, i, Array.from(arr));
            tempNode = tempNode.next;
        }
        swapEles(arr, min_idx, i);
        tempNode.next = new Node(min_idx, i, Array.from(arr));
        tempNode = tempNode.next;
    }

    return head.next
}

const getInsertionSortLL = (arr) => {
    let key, j;
    n = arr.length;

    let head = new Node(null, null);
    let tempNode = head;

    for (let i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        // shift to right untill an min is found
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            tempNode.next = new Node(j + 1, j, Array.from(arr));
            tempNode = tempNode.next;
            j--;
        }
        arr[j + 1] = key;
    }
    return head.next;
}

function partition(arr, low, high, statesArr) {

    const addNode = (i, j, arr) => {
        statesArr.push(new Node(i, j, Array.from(arr)));
    }

    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swapEles(arr, i, j);
            addNode(i, j, arr);
        }
        else if (i > -1) {
            addNode(i, j, arr);
        }
    }
    swapEles(arr, i + 1, high);
    addNode(i + 1, high, arr);
    return (i + 1);
}

function quickSort(arr, low, high, statesArr) {
    if (low < high) {
        let pi = partition(arr, low, high, statesArr);
        quickSort(arr, low, pi - 1, statesArr);
        quickSort(arr, pi + 1, high, statesArr);
    }
}

const getQuickSortLL = (arr) => {
    let head = new Node(null, null);
    let tempHead = head;
    let temp = []
    quickSort(arr, 0, arr.length - 1, temp);
    // convert arr to Linked List
    for (let i = 0; i < temp.length; i++) {
        let ele = temp[i];
        tempHead.next = ele;
        tempHead = tempHead.next;
    }
    return head.next;
}

function merge(arr, l, m, r, statesArr) {

    const addNode = (i, j) => {
        statesArr.push(new Node(i, j, Array.from(arr)));
    }

    let n1 = m - l + 1;
    let n2 = r - m;

    // Create temp arrays
    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            addNode(k, l + i)
            i++;
        }
        else {
            arr[k] = R[j];
            addNode(k, m + 1 + j)
            j++;
        }
        k++;
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        addNode(k, l + i)
        i++;
        k++;
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        addNode(k, m + 1 + j)
        j++;
        k++;
    }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergeSort(arr, l, r, statesArr) {
    if (l >= r) {
        return;//returns recursively
    }
    let m = l + parseInt((r - l) / 2);
    mergeSort(arr, l, m, statesArr);
    mergeSort(arr, m + 1, r, statesArr);
    merge(arr, l, m, r, statesArr);
}

const getMergeSortLL = (arr) => {
    let head = new Node(null, null)
    let tempHead = head;

    let temp = []
    mergeSort(arr, 0, arr.length - 1, temp);

    temp.forEach(ele => {
        tempHead.next = ele;
        tempHead = tempHead.next
    });

    return head.next;
}


