
# ==================================
# Merge Methods
# ==================================

# The merge method takes two hashes and combines them. 
# If there are any identical keys, the input method wins by default (but this behavior can be modified).
h1 = {:a => 2, :b => 4, :c => 6}
h2 = {:a => 3, :b => 4, :d => 8}

h1.merge(h2) # {:a => 3, :b => 4, :c => 6, :d => 8}

# Custom merge behavior
conflict = h1.merge(h2) {| k, o, n | "CONFLICT" }
p conflict # {:a => "CONFLICT", :b => "CONFLICT", :c => 6, :d => 8}

customMerge = h1.merge(h2) {| key, oldValue, newValue | (oldValue < newValue) ? oldValue : newValue } 
p customMerge # {:a => 2, :b => 4, : c => 6, : d => 8}

samesies = h1.merge(h2) {| key, o, n | o == n ? "sameVal" : n }
p samesies # {:a => 3, :b => "sameVal", :c => 6, :d => 8}
