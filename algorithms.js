const getBubbleSortLL = (list) => {
    let head = new Node(null, null);
    let tempNode = head;

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - i - 1; j++) {
            if (list[j] > list[j + 1]) {
                swapEles(list, j, j + 1)
                tempNode.next = new Node(j, j + 1, swap = true);
                tempNode = tempNode.next;
            }
            else {
                tempNode.next = new Node(j, j + 1, swap = false);
                tempNode = tempNode.next;
            }
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
            tempNode.next = new Node(j, i, swap = false);
            tempNode = tempNode.next;
        }
        swapEles(arr, min_idx, i);
        tempNode.next = new Node(min_idx, i, swap = true);
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
            tempNode.next = new Node(j + 1, j, swap = true);
            tempNode = tempNode.next;
            j--;
        }
        arr[j + 1] = key;
    }
    return head.next;
}



